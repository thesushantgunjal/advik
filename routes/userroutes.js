var express = require ("express");
var router = express.Router();
var url = require("url");
var exe = require("./connection")

router.get("/",async function(req,res){
    var slider=await exe(`select * from sliders`);
    var data=await exe(`select * from company_informations`);
    var old_data=await exe(`select * from about_us`);
    var testimonial=await exe(`select * from testimonials`);
    var founder=await exe(`select * from founders`);
    var why_choose_us_data=await exe(`select * from why_choose_us`);
    var topper=await exe(`select * from toppers`);
    var counts=await exe(`select * from counts`);
    var popular_courses=await exe(`SELECT * FROM popular_courses ORDER BY popular_course_id DESC LIMIT 3`);
    var data2=await exe(`SELECT * FROM latest_blog ORDER BY latest_blog_id DESC LIMIT 3`);
    var obj ={"sliders":slider,"company_informations":data[0],"testimonials":testimonial,"founders":founder[0],"why_choose_us":why_choose_us_data[0],"toppers":topper,"old_data":old_data[0],"popular_courses":popular_courses,"counts":counts[0],"latest_blog_data":data2}
    res.render("user/home.ejs",obj)
})

router.get("/about",async function(req,res){
    var old_data=await exe(`select * from about_us`);
    var company_information=await exe(`select * from company_informations`);
    var data=await exe(`select * from our_mission_visions`);
    var faq=await exe(`select * from faqs`);
    var testimonial=await exe(`select * from testimonials`);
    var founder=await exe(`select * from founders`);
    var obj ={"company_informations":company_information[0],"our_mission_visions":data[0],"faqs":faq,"testimonials":testimonial,"founders":founder[0],"old_data":old_data[0]};
    res.render("user/about.ejs",obj);
})
router.get("/courses",async function(req,res){
    var popular_courses=await exe(`SELECT * FROM popular_courses ORDER BY popular_course_id DESC LIMIT 6`);
    var data9=await exe(`select * from company_informations`);
    var awesome_features=await exe(`select * from awesome_features`); var url_data = url.parse(req.url,true).query;
    var data=await exe(`SELECT * FROM course_category `);
    if(url_data.course_category_id == undefined)
        {
            var data2=await exe(`SELECT * FROM courses`);

    }else{
        var data2=await exe(`SELECT * FROM courses WHERE course_category_id='${url_data.course_category_id}' `);

        
    }

    var level_category_data=await exe(`SELECT * FROM level_category`);
   
    
    if(url_data.level_category_id == undefined)
        {
            var level=await exe(`SELECT * FROM level`);

    }else{
        var level=await exe(`SELECT * FROM level WHERE level_category_id='${url_data.level_category_id}' `);

        
    }


    var obj ={"company_informations":data9[0],"popular_courses":popular_courses,"awesome_features":awesome_features[0],"courses_data":data,"courses_data2":data2,"level_category_data":level_category_data,"level_data":level}
    res.render("user/courses.ejs",obj)
})

router.get("/gallery",async function(req,res){
    var url_data = url.parse(req.url,true).query;
    var data=await exe(`SELECT * FROM categories`);
     if(url_data.category_id == undefined)
         {
         var gallry=await exe(`SELECT * FROM gallery`);
     }else{
        var gallry=await exe(`SELECT * FROM gallery WHERE category_id='${url_data.category_id}'`);
     }
    
     //res.send(obj);

    var company_information=await exe(`select * from company_informations`);
     var data9 = await exe(`SELECT * FROM gallery_sliders `);
    var obj ={"company_informations":company_information[0],"gallery_sliders":data9[0],"old_data":data,"gallry_old_data":gallry};

    //res.send(obj)
    //res.send(data)

    res.render("user/gallery.ejs",obj);
})
router.get("/contact",async function(req,res){
    var company_information=await exe(`select * from company_informations`);
    var data = await exe(`SELECT * FROM contacts`);
    var obj ={"company_informations":company_information[0],"contacts":data[0]};
    res.render("user/contact.ejs",obj)
})
router.post("/contact_form",async function(req,res){
    var d=req.body;
    var sql=`INSERT INTO contact_form(student_name,student_email,student_number,student_subject,student_message) VALUES 
    ('${d.student_name}','${d.student_email}','${d.student_number}','${d.student_subject}','${d.student_message}')`;

    var data=await exe(sql);

    //res.send(data);
    res.redirect("/contact");
    
});

router.get("/result",async function(req,res){
    var url_data = url.parse(req.url,true).query;
    var result_data=await exe(`SELECT * FROM result_category`) ;
    var company_information=await exe(`select * from company_informations`);
    var subject_toppers=await exe(`select * from subject_topper`);
    var student_achievements=await exe(`select * from student_achievements`);
   

    
    var result_data=await exe(`SELECT * FROM result_category`) ;


    if(url_data.result_category_id == undefined)
        {
            var result=await exe(`SELECT * FROM result`);
    }else{
        var result=await exe(`SELECT * FROM result WHERE result_category_id='${url_data.result_category_id}'`);
    }

    var obj ={"company_informations":company_information[0],"subject_topper":subject_toppers[0],"student_achievements":student_achievements[0],
        "result_categary_data":result_data,"result_data":result
    }
    res.render("user/result.ejs",obj)
})

router.get("/blog",async function(req,res){
    var company_information=await exe(`select * from company_informations`);
    var data=await exe(`SELECT * FROM recent_post_blog  ORDER BY recent_post_blog_id DESC`);
    var data2=await exe(`SELECT * FROM latest_blog ORDER BY latest_blog_id DESC`);
    var data3=await exe(`SELECT * FROM research_blog`);
    var obj={"company_informations":company_information[0],"blog_data":data,"latest_blog_data":data2,"research_blog_data":data3};
    res.render("user/blog.ejs",obj);
});
router.get("/blog_user/:id",async function(req,res){
    var company_information=await exe(`select * from company_informations`);
    var id=req.params.id;
    var data=await exe(`SELECT * FROM latest_blog WHERE latest_blog_id='${id}'  `);
    var obj={"company_informations":company_information[0],"old_data":data[0]};
    res.render("user/blog_post_page.ejs",obj);
});


module.exports = router;