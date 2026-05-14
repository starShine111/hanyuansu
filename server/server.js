// 先引入依赖express\mysql2\cors
// 使用require
const express=require('express');//
const mysql=require('mysql2/promise');//数据库
const cors=require('cors');//解决跨域问题

// 创建服务（⭐⭐）
// app\port分别代表什么？为什么要定义PORT
// app代表Express应用实例，用来定义路由和中间件
const app=express();
const PORT=3000;//服务监听的端口号，定义成变量方便修改

// 中间件
// 作用？
app.use(cors());//解决跨域，让前端能调用接口
app.use(express.json());//解析请求中的JSON数据

// 数据库连接池
const pool=mysql.createPool({
    host:'localhost',//使用本地数据库
    user:'root',
    password:'123456',
    database:'uni-shop',
    waitForConnections:true,
    connectionLimit:10//连接数量限制
})

// 连接测试
// async的作用是声明函数是异步的 和 await等待异步操作完成 
// connection.release() 释放连接回连接池
// 连接失败打印错误信息
async function testConnection() {
    try {
        const connection=await pool.getConnection();
        console.log('✅ 数据库连接成功！');
        connection.release();
        
    } catch (error) {
        console.log('❌ 数据库连接失败:', error.message);
    }
}

testConnection();
// API接口

// 获取商品列表接口
// 根据朝代查询商品
// 问题6：const { dynasty } = req.query 这句话是从请求中获取dynasty值；用户访问 http://localhost:3000/api/products?dynasty=tang，dynasty 的值是tang;
// 如果不传 dynasty 参数（只访问 /api/products），dynasty=undefined,不会进入if(dynasty),会返回所有朝代商品
// 问题：使用？是防止SQL注入攻击；params.push(dynasty) 的作用是将值加入到sql中
app.get('/api/products',async(req,res)=>{
    try {
        const {dynasty} =req.query;//获取URL参数
        let sql=`SELECT 
            p.id,
            p.name,
            p.subtitle,
            p.main_image,
            p.dynasty,
            MIN(s.price) as price,
            MIN(s.original_price) as original_price,
            SUM(s.sales) as total_sales
            FROM product p
            LEFT JOIN sku s ON p.id=s.product_id
            WHERE p.status=1 `;

            const params=[];

            if(dynasty){
                sql+=  `AND p.dynasty=?`;
                params.push(dynasty);
            }

            sql += ` GROUP BY p.id ORDER BY p.created_at DESC`;

            const [products] =await pool.query(sql,params);

            res.json({
                code:0,
                data:products,
                message:'success'
            })
    } catch (error) {
        res.json({code:500,message:error})
    }
})

// 商品详情页接口
// 问题8答案：  :id表示根据动态的id值返回对应数据;/api/products/3，id 的值是3；product.skus = skus 这行代码的作用是将查询到的商品规格添加到商品对象中，这样返回的数据就包含商品信息+所有规格信息
// 问题9答案：统一返回有利于快速定位报错原因；0表示成功，500表示失败
app.get('/api/products/:id',async(req,res)=>{
    try {
        const {id} =req.params;//获取路径参数

        const [products] =await pool.query(`
            SELECT * FROM product WHERE id=? AND status=1`,[id]);

        const [skus]= await pool.query(`
            SELECT id,size,color,price,original_price,stock,sales
            FROM sku WHERE product_id=?
            `,[id]);

        const product=products[0];
        
        // 解析JSON字符串
        if(product.images){
            try {
                product.images=JSON.parse(product.images)
            } catch (error) {
            }
        }else{
            product.images=[product.main_image]
        }

        product.skus=skus;
        res.json({code:0,data:product})

    } catch (error) {
        res.json({code:500,message:error})
    }
})


// 启动服务
// 问题10答案：作用是启动数据库连接池端口；如果端口号被占，启动报错
app.listen(PORT,()=>{
    console.log(`🚀 服务已启动！`),
    console.log(`📦 访问地址: http://localhost:${PORT}`)
})