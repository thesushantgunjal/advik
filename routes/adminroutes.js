var express = require ("express");
var router = express.Router();
var exe = require("./connection");
const { route } = require("./userroutes");
const { render } = require("ejs");

router.get("/",function(req,res){
    res.render("admin/admin_home.ejs")
})
router.get("/login_page",function(req,res){
    res.render("admin/login_page.ejs");
});

router.post("/register",async function(req,res){
    var d=req.body;

    var sql=`INSERT INTO users(username,email,address,password)VALUES('${d.username}','${d.email}','${d.address}','${d.password}')`;

    var data=await exe(sql);
    
   // res.send(data);

   res.redirect("admin/login_page");
});

router.post("/login-container",async function(req,res){
   // res.send(req.body);
    var d=req.body;
   var sql=`SELECT * FROM users WHERE Username= '${d.username}' AND password= '${d.password}'`;
   var data=await exe(sql);
   if(data.length >0){
    req.session.users_id = data[0].users_id;
    //res.send("login succes"+data[0].account_id);
    res.redirect("/admin/profile");
}else{
    const alertMessage = "<script>alert('This is an alert from Node.js!');</script>";
    res.send(alertMessage);
}
});

router.get("/profile",function(req,res){
    res.render("admin/home.ejs");
});

router.get("/admin_profile",async function(req,res){
   
    var data=await exe(`SELECT * FROM users WHERE users_id`);
    var obj={"old_data":data[0]};
    res.render("admin/admin_profile.ejs",obj);
});

router.post("/admin_update_data",async function(req,res){
   var d=req.body;
   var sql=`UPDATE users
SET username ='${d.name}',email ='${d.email}',password='${d.password}'
WHERE users_id='${d.admin_id}'`;

var data=await exe(sql);

//res.send(sql);
res.redirect("/admin/profile");
})





router.get("/about_home",async function(req,res){
    var data=await exe(`SELECT * FROM about_us WHERE about_us_id= 3`);
    var obj={"old_data":data[0]};
   // res.send(data)
    res.render("admin/about.ejs",obj);
})


router.get("/slider",async function(req,res){
    var data = await exe(`SELECT * FROM sliders`);
    var obj ={"sliders":data};
   // res.send(data);
    res.render("admin/slider.ejs",obj)
})

router.post("/save_slider", async function(req, res) {
    
    var d = req.body;

    var files_name = new Date().getTime() + req.files.slider_image_1.name;
    req.files.slider_image_1.mv("public/uploads/"+files_name);

    var files_name2 = new Date().getTime() + req.files.slider_image_2.name;
    req.files.slider_image_2.mv("public/uploads/"+files_name2);

    var files_name3 = new Date().getTime() + req.files.slider_image_3.name;
    req.files.slider_image_3.mv("public/uploads/"+files_name3);

    var sql = `INSERT INTO sliders (slider_heading, button_text, slider_text, slider_heading_text,slider_image_1,slider_image_2,slider_image_3) VALUES ('${d.slider_heading}','${d.button_text}','${d.slider_text}','${d.slider_heading_text}','${files_name}','${files_name2}','${files_name3}') `;

    var data = await exe(sql);
    //  res.send(data);
    res.redirect("/admin/slider");
});



 router.get("/edit_slider/:id",async function(req,res){
   var id = req.params.id;
   var data=await exe(`SELECT * FROM sliders WHERE id='${id}'`);
   var obj={"old_data":data[0]};

   res.render("admin/edit_slider.ejs",obj);
 });

 router.post("/update_slider",async function(req,res){
    var d = req.body;
    var files_name = new Date().getTime() + req.files.slider_image_1.name;
    req.files.slider_image_1.mv("public/uploads/"+files_name);

    var files_name2 = new Date().getTime() + req.files.slider_image_2.name;
    req.files.slider_image_2.mv("public/uploads/"+files_name2);

    var files_name3 = new Date().getTime() + req.files.slider_image_3.name;
    req.files.slider_image_3.mv("public/uploads/"+files_name3);

var sql2 =`UPDATE sliders
SET slider_image_1='${files_name}',slider_image_1='${files_name}',slider_image_3='${files_name3}' WHERE id='${d.slider_id}'`

var data2 =await exe(sql2) ;  
   
    var sql =`UPDATE sliders
SET slider_heading = '${d.slider_heading}', button_text = '${d.button_text}',
slider_text = '${d.slider_text}',slider_heading_text ='${d.slider_heading_text}'
WHERE id='${d.slider_id}'
`
var data =await exe(sql)
   

    //res.send(data2);

    res.redirect("/admin/slider")
 })
 router.get("/delete_slider/:id",async function(req,res){
    var data = await exe(`delete from sliders where id = '${req.params.id}'`);
    res.send("<script>alert('sliders Delete Sucessfully');location = '/admin/slider'</script>");
})
router.get("/gallery_slider",async function(req,res){
    var data = await exe(`SELECT * FROM gallery_sliders WHERE gallery_slider_id =  1`);
    var obj ={"gallery_sliders":data[0]};
    //res.send(data)
    res.render("admin/gallery_slider.ejs",obj)
})


router.post("/save_gallery_slider",async function(req,res)
{
    var d = req.body;
    var files_name = new Date().getTime() + req.files.gallery_slider_image_1.name;
    req.files.gallery_slider_image_1.mv("public/uploads/"+files_name);
    
    var files_name2 = new Date().getTime() + req.files.gallery_slider_image_2.name;
    req.files.gallery_slider_image_2.mv("public/uploads/"+files_name2);
    

    var files_name3 = new Date().getTime() + req.files.gallery_slider_image_3.name;
    req.files.gallery_slider_image_3.mv("public/uploads/"+files_name3);

    //var sql = `INSERT INTO gallery_sliders (gallery_slider_image_1,gallery_slider_image_2,gallery_slider_image_3) VALUES ('${files_name}','${files_name2}','${files_name3}') `;
    
    var sql=`UPDATE gallery_sliders SET gallery_slider_image_1 = '${files_name}', gallery_slider_image_2 = '${files_name2}', gallery_slider_image_3 = '${files_name3}'  WHERE gallery_slider_id = '${d.gallery_slider_id}';`
    var data=await exe(sql);
    // res.send("data")
    res.redirect("/admin/gallery_slider");
})

router.get("/add_contact",async function(req,res){
    var data = await exe(`SELECT * FROM contacts WHERE contact_id =  1`);
    var obj ={"contacts":data[0]};
    // res.render(data)
    res.render("admin/add_contact.ejs",obj)
})
router.post("/save_contact",async function(req,res){
    var d = req.body;

    // var sql = `INSERT INTO contacts (contact_email, contact_hours, contact_mobile_1, contact_mobile_2, contact_location, contact_whatsapp_link, contact_maps_link)
    // VALUES ('${d.contact_email}','${d.contact_hours}','${d.contact_mobile_1}','${d.contact_mobile_2}','${d.contact_location}','${d.contact_whatsapp_link}','${d.contact_maps_link}')`;

        var sql = `UPDATE contacts
    SET contact_email = '${d.contact_email}',
        contact_hours = '${d.contact_hours}',
        contact_mobile_1 = '${d.contact_mobile_1}',
        contact_mobile_2 = '${d.contact_mobile_2}',
        contact_location = '${d.contact_location}',
        contact_whatsapp_link = '${d.contact_whatsapp_link}',
        contact_maps_link = '${d.contact_maps_link}'
    WHERE contact_id = '${d.contact_id}';`
    var data=await exe(sql);

    // res.send("data")
    res.redirect("/admin/add_contact");
})


router.get("/company_information",async function(req,res){
    var data = await exe(`SELECT * FROM company_informations WHERE company_info_id =  1`);
    var obj ={"company_informations":data[0]};
    res.render("admin/company_information.ejs",obj)
})

router.post("/save_company_informations",async function(req,res){
    var d = req.body;
    var files_name = new Date().getTime() + req.files.company_info_navbar_logo.name;
    req.files.company_info_navbar_logo.mv("public/uploads/"+files_name);
    
    var files_name2 = new Date().getTime() + req.files.company_info_footer_logo.name;
    req.files.company_info_footer_logo.mv("public/uploads/"+files_name2);
    
 var sql = `INSERT INTO company_informations (company_info_location, company_info_email, company_info_mobile, company_info_facebook_link, company_info_twitter_link, company_info_youtube_link, company_info_text,company_info_navbar_logo,company_info_footer_logo) VALUES 
 ('${d.company_info_location}','${d.company_info_email}','${d.company_info_mobile}','${d.company_info_facebook_link}','${d.company_info_twitter_link}','${d.company_info_youtube_link}','${d.company_info_text}') `;

    var sql=`UPDATE company_informations SET 
    company_info_location = '${d.company_info_location}',
    company_info_email = '${d.company_info_email}',
    company_info_mobile = '${d.company_info_mobile}',
    company_info_facebook_link = '${d.company_info_facebook_link}',
    company_info_instagram_link = '${d.company_info_instagram_link}',
    company_info_twitter_link = '${d.company_info_twitter_link}',
    company_info_youtube_link = '${d.company_info_youtube_link}',
    company_info_text = '${d.company_info_text}',
    company_info_navbar_logo = '${files_name}',
    company_info_footer_logo = '${files_name2}'
WHERE company_info_id = '${d.company_info_id}';`

    var data=await exe(sql);

     //res.send(data);
    res.redirect("/admin/company_information");

})

router.get("/add_Our_mission_&_vision",async function(req,res){
    var data = await exe(`SELECT * FROM our_mission_visions WHERE Our_mission_visions_id =  1`);
    var obj ={"our_mission_visions":data[0]};
    res.render("admin/add_Our_mission_&_vision.ejs",obj)
})
router.post("/save_Our_mission_&_vision",async function(req,res){
    var d = req.body;

    // var sql = `INSERT INTO our_mission_visions (our_mission_text,our_vision_text) VALUES ('${d.Our_mission_text}','${d.our_vision_text}')`;
    var sql = `UPDATE our_mission_visions
    SET Our_mission_text = '${d.Our_mission_text}',
        our_vision_text = '${d.our_vision_text}'
    WHERE Our_mission_visions_id = '${d.Our_mission_visions_id}';`
    var data=await exe(sql);
    //  res.send(data);
   res.redirect("/admin/add_Our_mission_&_vision");

});

router.get("/add_faq",async function(req,res){
    var data = await exe(`SELECT * FROM faqs`);
    var obj ={"faqs":data};
    res.render("admin/add_faq.ejs",obj);

})

router.post("/save_faq",async function(req,res){
    var d = req.body;

    var sql = `INSERT INTO faqs (faq_question_text,faq_answer_text) VALUES ('${d.faq_question_text}','${d.faq_answer_text}')`;
    var data=await exe(sql);
    //  res.send("data");
   res.redirect("/admin/add_faq");

});

router.get("/edit_faq/:faq_id",async function(req,res) 
{
    var id = req.params.faq_id;
    var data=await exe(`SELECT * FROM faqs WHERE faq_id='${id}'`);
    var obj={"faqs":data[0]};

    res.render("admin/edit_faq.ejs",obj);
    
});


router.post("/update_faq",async function(req,res){
    var d = req.body;
    var sql =`UPDATE faqs SET faq_question_text = '${d.faq_question_text}', faq_answer_text = '${d.faq_answer_text}' WHERE faq_id='${d.faq_id}'`
    var data =await exe(sql)
    res.redirect("/admin/add_faq")
 })

router.get("/delete_faq/:faq_id",async function(req,res){
    var data = await exe(`delete from faqs where faq_id = '${req.params.faq_id}'`);
    res.send("<script>alert('faqs Delete Sucessfully');location = '/admin/add_faq'</script>");
})
router.get("/add_testimonials",async function(req,res){
    var data = await exe(`SELECT * FROM testimonials`);
    var obj ={"testimonials":data};
    res.render("admin/add_testimonials.ejs",obj);

})
router.post("/save_Testimonials", async function(req, res) {
    
    var d = req.body;
    var files_name = new Date().getTime() + req.files.testimonial_photo.name;
    req.files.testimonial_photo.mv("public/uploads/"+files_name);

    var sql = `INSERT INTO testimonials (testimonial_photo, testimonial_text, testimonial_name) VALUES ('${files_name}','${d.testimonial_text}','${d.testimonial_name}')`;

    var data = await exe(sql);
    //  res.send("data");
    res.redirect("/admin/add_testimonials");
});
router.get("/edit_testimonial/:testimonial_id",async function(req,res) 
{
    var id = req.params.testimonial_id;
    var data=await exe(`SELECT * FROM testimonials WHERE testimonial_id='${id}'`);
    var obj={"testimonials":data[0]};

    res.render("admin/edit_testimonial.ejs",obj);
    
});
router.post("/update_testimonial",async function(req,res){
    var d = req.body;
    var files_name = new Date().getTime() + req.files.testimonial_photo.name;
    req.files.testimonial_photo.mv("public/uploads/"+files_name);

    var sql =`UPDATE testimonials SET testimonial_name = '${d.testimonial_name}', testimonial_text = '${d.testimonial_text}', testimonial_photo ='${files_name}'
WHERE testimonial_id='${d.testimonial_id}'
`
var data =await exe(sql)

//res.send(sql);

    res.redirect("/admin/add_testimonials")
 })
 router.get("/delete_testimonial/:testimonial_id",async function(req,res){
    var data = await exe(`delete from testimonials where testimonial_id = '${req.params.testimonial_id}'`);
    res.send("<script>alert('testimonials Delete Sucessfully');location = '/admin/add_testimonials'</script>");
})

router.get("/add_about_founder",async function(req,res){
    
    var data = await exe(`SELECT * FROM founders WHERE founder_id =  1`);
    var obj ={"founders":data[0]};
   //res.send(obj)
    res.render("admin/add_about_founder.ejs",obj)
})
router.post("/save_founder",async function(req,res){
    var d = req.body;
    var files_name = new Date().getTime() + req.files.founder_photo.name;
    req.files.founder_photo.mv("public/uploads/"+files_name);
    
    // var sql = `INSERT INTO founders (founder_information, founder_email,founder_mobile, founder_photo) VALUES ('${d.founder_information}','${d.founder_email}','${d.founder_mobile}','${files_name}')`;

    var sql = `UPDATE founders
    SET founder_information = '${d.founder_information}',
        founder_email = '${d.founder_email}',
        founder_mobile = '${d.founder_mobile}',
                founder_photo = '${files_name}'
    WHERE founder_id = '${d.founder_id}';`

    var data = await exe(sql);

    // res.send("data");
    res.redirect("/admin/add_about_founder");

})
router.get("/add_why_choose_us",async function(req,res){
    var data = await exe(`SELECT * FROM why_choose_us WHERE why_choose_us_id =  1`);
    var obj ={"why_choose_us":data[0]};
    res.render("admin/add_why_choose_us.ejs",obj)

})
router.post("/save_why_choose_us",async function(req,res){
    var d = req.body;
    
    // var sql = `INSERT INTO why_choose_us (knowledge_heading, knowledge_information_text,experience_heading,experience_information_text,environment_heading,environment_information_text) VALUES ('${d.knowledge_heading}','${d.knowledge_information_text}','${d.experience_heading}','${d.experience_information_text}','${d.environment_heading}','${d.environment_information_text}')`;

    var sql = `UPDATE why_choose_us
    SET knowledge_heading = '${d.knowledge_heading}',
        knowledge_information_text = '${d.knowledge_information_text}',
        experience_heading = '${d.experience_heading}',
        experience_information_text = '${d.experience_information_text}',
        environment_heading = '${d.environment_heading}',
        environment_information_text = '${d.environment_information_text}'
    WHERE why_choose_us_id = '${d.why_choose_us_id}'`;

    var data = await exe(sql);

    // res.send("data");
    res.redirect("/admin/add_why_choose_us");

})
router.get("/add_Toppers",async function(req,res){
    var data = await exe(`SELECT * FROM toppers`);
    var obj ={"toppers":data};
    res.render("admin/add_Toppers.ejs",obj);
})
router.post("/save_topper",async function(req,res){
    var d = req.body;
    var files_name = new Date().getTime() + req.files.topper_photo.name;
    req.files.topper_photo.mv("public/uploads/"+files_name);

    var sql = `INSERT INTO toppers (topper_photo, topper_name, topper_subject, topper_percentage, topper_number) VALUES ('${files_name}','${d.topper_name}','${d.topper_subject}','${d.topper_percentage}','${d.topper_number}')`;

    var data = await exe(sql);
    // res.send("data");

    res.redirect("/admin/add_Toppers");
})
router.get("/edit_topper/:topper_id",async function(req,res){
    var id = req.params.topper_id;
    var data=await exe(`SELECT * FROM toppers WHERE topper_id='${id}'`);
    var obj={"toppers":data[0]};
    // res.send("data");

    res.render("admin/edit_topper.ejs",obj);

})
router.post("/update_topper",async function(req,res){
    var d = req.body;
    var files_name = new Date().getTime() + req.files.topper_photo.name;
    req.files.topper_photo.mv("public/uploads/"+files_name);

    var sql =`UPDATE toppers SET topper_name = '${d.topper_name}', topper_subject = '${d.topper_subject}', topper_percentage = '${d.topper_percentage}', topper_number = '${d.topper_number}', topper_photo ='${files_name}'
WHERE topper_id='${d.topper_id}'
`
var data =await exe(sql)

//res.send(sql);

    res.redirect("/admin/add_Toppers")
 })














 

router.post("/submit-about",async function(req,res){
    var d=req.body;
    var files_name = new Date().getTime() + req.files.aboutImage.name;
        req.files.aboutImage.mv("public/uploads/"+files_name);
    
    var sql=`UPDATE about_us
SET aboutText1 = '${d.aboutText1}',
    aboutText2 = '${d.aboutText2}',
    aboutImage = '${files_name}'
WHERE about_us_id = '${d.about_us_id}';
`
    var data=await exe(sql);
    //res.send(data);
    res.redirect("/admin/about_home")
});

router.get("/gallry_categary",async function(req,res){
    var data=await exe(`SELECT * FROM categories`);
    var obj={"old_data":data};
    res.render("admin/gallry_categary.ejs",obj);
});


router.post("/gallry_categary_form",async function(req,res){
    var d=req.body;
    var sql=`INSERT INTO categories(category_name) VALUES ('${d.category_name}')`;
    var data=await exe(sql);
   // res.send(data);
   res.redirect("/admin/gallry_categary")
});

router.get("/gallry",async function(req,res){
    var data=await exe('SELECT * FROM categories');
    var data2=await exe(`SELECT * FROM gallery`);
    var obj={"old_data":data,"gallry_data":data2};

    
    
    //res.send(obj)
    res.render("admin/gallry.ejs",obj);
}

);

router.post("/gallery_page",async function(req,res){
    var d=req.body;
    if(req.files){
        var files_name2 = new Date().getTime() + req.files.gallery_img.name;
        req.files.gallery_img.mv("public/uploads/"+files_name2);
    }
   
        
    var sql=`INSERT INTO gallery(category_id,gallery_video,gallery_text,gallery_text2,gallery_img)VALUES ('${d.category_id}'
    ,'${d.gallry_video}','${d.gallry_text}','${d.aboutText2}','${files_name2}')`;
    var data=await exe(sql);
   // res.send(data);
  
   res.redirect("/admin/gallry");
});

router.get("/delete_category/:id",async function(req,res){
var id=req.params.id;
var data=await exe(`DELETE FROM categories WHERE category_id='${id}'`);
//res.send(data);
res.redirect("/admin/gallry_categary");

});

router.get("/edit_category/:id",async function(req,res){
   var id=req.params.id;
   var data=await exe(`SELECT * FROM categories WHERE category_id='${id}' `);
   var obj={"old_data":data[0]};

   res.render("admin/update_category.ejs",obj)
});

router.post("/update_categary",async function(req,res){
    var d=req.body;
    var sql=`UPDATE categories
SET category_name = '${d.category_name}'
WHERE category_id='${d.update_categary}' `;
var data=await exe(sql);
res.redirect("/admin/gallry_categary");
});

router.get("/update_gallry_delete/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`DELETE FROM gallery WHERE gallery_id ='${id}' `);
    //res.send(data); 
    res.redirect("/admin/gallry");
});

router.get("/update_gallry_edit/:id",async function(req,res){
    var id=req.params.id;

    var data=await exe(`SELECT * FROM gallery WHERE gallery_id ='${id}' `);
    var obj={"old_data":data[0]};
    res.render("admin/gallry_update_data.ejs",obj);
});

router.post("/galler_update_page",async function(req,res){
    var d=req.body;

   
        var files_name2 = new Date().getTime() + req.files.gallery_img_2.name
        req.files.gallery_img_2.mv("public/uploads/"+files_name2);
    

    var sql=`UPDATE gallery
SET gallery_video='${d.gallry_video}',gallery_text='${d.gallry_text}',gallery_text2='${d.aboutText2}',
gallery_img ='${files_name2}'
WHERE gallery_id='${d.gallery_update_id}' `;
var data=await exe(sql);

//res.send(data);

res.redirect("/admin/gallry");

//res.send(data);
});


router.get("/result_categary",async function(req,res){
    var data=await exe(`SELECT * FROM result_category`);
    var obj={"result_data":data};
    //res.send(data);
   res.render("admin/result_page.ejs",obj);
});

router.post("/result_categary_form",async function(req,res){
    var d=req.body;

    var sql=`INSERT INTO result_category(category_name) VALUES ('${d.category_name}')`;
    var result_data=await exe(sql);
    //res.send(result_data);
    res.redirect("/admin/result_categary");
});

router.get("/delete_result_category/:id",async function(req,res){
    var id=req.params.id;

    var data=await exe(`DELETE FROM result_category
WHERE result_category_id='${id}'`);

res.redirect("/admin/result_categary");

//res.send(data);
});

router.get("/edit_result_category/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`SELECT * FROM result_category WHERE result_category_id='${id}' `);
    var obj={"old_data":data[0]};
    res.render("admin/update_result_page.ejs",obj);
    
});

router.post("/result_update_form",async function(req,res){
   var d=req.body;
   var  data=await exe(`UPDATE result_category
SET category_name ='${d.category_name}' WHERE result_category_id='${d.result_update_category}' `);

//res.send(data)
res.redirect("/admin/result_categary");
});

router.get("/result",async function(req,res){
    var data=await exe('SELECT * FROM result_category');
    var result_data=await exe('SELECT * FROM result')
    var obj={"result_data":data,"old_data":result_data};
    res.render("admin/result.ejs",obj);
});

router.post("/result_page",async function(req,res){
    var files_name = new Date().getTime() + req.files.result_img.name
        req.files.result_img.mv("public/uploads/"+files_name);
    
    var d=req.body;

    var sql=`INSERT INTO result(result_category_id,student_name,student_parentage,result_img) VALUES ('${d.result_category_id}',
    '${d.student_name}','${d.student_parentage}','${files_name}')`;

    var data=await exe(sql);
    //res.send(data)
    res.redirect("/admin/result")
});

router.get("/result_delete/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`DELETE FROM result
WHERE result_id = '${id}'`);

//res.send(data);
res.redirect("/admin/result")
});

router.get("/update_result_edit/:id",async function(req,res){
   var id=req.params.id;
   var data=await exe(`SELECT * FROM result WHERE result_id='${id}'`);
var obj={"old_result_data":data[0]};

//res.send(obj)

res.render("admin/update_result.ejs",obj);
});

router.post("/result_update_data",async function(req,res){

    
        var files_name = new Date().getTime() + req.files.result_img.name;
        req.files.result_img.mv("public/uploads/" + files_name);

    var d=req.body;
    var sql=`UPDATE result
SET student_name ='${d.student_name}', student_parentage = '${d.student_parentage}',result_img = '${files_name}'
WHERE result_id='${d.result_update_data}'`;
var data=await exe(sql);

//res.send(data);
res.redirect("/admin/result");
});

router.get("/rankes",async function(req,res){
    var data=await exe('SELECT * FROM student_achievements WHERE student_achievements_id = 12');
    var obj={"old_data":data[0]};
    res.render("admin/rankes.ejs",obj);
});

router.post("/student_achievment",async function(req,res){
    var d=req.body;

    var sql = `UPDATE student_achievements
SET 
    parentage_1 = '${d.parentage_1}',
    number_of_students_1 = '${d.Number_of_Students_1}',
    parentage_2 = '${d.p_2}',
    number_of_students_2 = '${d.Number_of_Students_2}',
    parentage_3 = '${d.parentage_3}',
    number_of_students_3 = '${d.Number_3}'
WHERE 
    student_achievements_id = '${d.achievment_id}'`;


var data=await exe(sql);



   res.redirect("/admin/rankes");
    
//    res.send(data);
});

router.get("/subject_topper",async function(req,res){
    var data=await exe(`SELECT * FROM subject_topper WHERE subject_topper_id= 1`);
    var obj={"old_topper_data":data[0]}
    res.render("admin/subject_topper.ejs",obj);
})

router.post("/subject_topper",async function(req,res){
   var d=req.body;
  var sql=`UPDATE subject_topper
SET vediv_math = '${d.vediv_math}',
    abacus = '${d.abacus}',
    rubik_cube = '${d.rubik_cube}',
    smart_write = '${d.smart_write}',
    grammar = '${d.grammar}'
WHERE subject_topper_id = '${d.topper_id}'`;

var data=await exe(sql);
  
   //res.send(data);
  res.redirect("/admin/subject_topper")
});

router.get("/contact",async function(req,res){
    var data=await exe(`SELECT * FROM contact_form ORDER BY contact_form_id DESC`);
    var obj={"contact_data":data};
    res.render("admin/contact_page.ejs",obj);
});

router.get("/update_contact_delete/:id",async function(req,res){
   var id=req.params.id;
   var data=await exe(`DELETE FROM contact_form WHERE contact_form_id = '${id}' `);
   res.redirect("/admin/contact")
   //res.send(data)
});

router.get("/blog",async function(req,res){
    var data=await exe(`SELECT * FROM recent_post_blog`);
    
    var obj={"blog_data":data};
    //res.send(obj);
    res.render("admin/blog_page.ejs",obj)
});

router.post("/recent_post_blog",async function(req,res){
    var blog_img = new Date().getTime() + req.files.blog_img.name;
        req.files.blog_img.mv("public/uploads/" + blog_img);
    var d=req.body;
    var sql=`INSERT INTO recent_post_blog(blog_title,blog_img) VALUES ('${d.blog_titale}','${blog_img}')`;
    var data=await exe(sql);

    res.redirect("/admin/blog");
   // res.send(data);
});

router.get("/blog_delete/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`DELETE FROM recent_post_blog WHERE recent_post_blog_id = '${id}'`);
    

 //res.send(data);
 res.redirect("/admin/blog");
    
});

router.get("/update_blog_edit/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`SELECT * FROM recent_post_blog WHERE recent_post_blog_id='${id}'`);
    var obj={"recent_post_data":data[0]};

    res.render("admin/recent_post_update.ejs",obj);
});

router.post("/recent_post_update",async function(req,res){
    var blog_img = new Date().getTime() + req.files.blog_img.name;
    req.files.blog_img.mv("public/uploads/" + blog_img);

    var d=req.body;
    var sql=`UPDATE recent_post_blog
SET blog_title ='${d.blog_titale}',blog_img = '${blog_img}'
WHERE recent_post_blog_id = '${d.recent_post_id}'`;

var data=await exe(sql);
res.redirect("/admin/blog");
//res.send(data);
    
});

router.get("/latest_blog",async function(req,res){
    var data=await exe(`SELECT * FROM latest_blog`);
    var obj={"latest_blog_data":data};
   res.render("admin/latest_blog.ejs",obj);
});

router.post("/latest_blog",async function(req,res){
    var d=req.body;

    var blog_latest_img = new Date().getTime() + req.files.latest_blog_img.name;
    req.files.latest_blog_img.mv("public/uploads/"+blog_latest_img);

   
    var sql =`INSERT INTO latest_blog(latest_blog_date,latest_blog_post_by,latest_blog_content,blog_short_description,latest_blog_img) VALUES ('${d.latest_blog_date}','${d.latest_blog_post_by}','${d.latest_blog_content}','${d.blog_short_description}','${blog_latest_img}')`;

    var data=await exe(sql);

    res.redirect("/admin/latest_blog");
   // res.send(data);
});

router.get("/latest_blog_delete/:id",async function(req,res){
   var id=req.params.id;
   var data=await exe(`DELETE FROM latest_blog
WHERE latest_blog_id ='${id}'`);

//res.send(data);

res.redirect("/admin/latest_blog")
});

router.get("/latest_blog_update/:id",async function(req,res){
   var id=req.params.id;
   var data=await exe(`SELECT * FROM latest_blog WHERE latest_blog_id='${id}'`);
   var obj={"old_data":data[0]};
   res.render("admin/latest_blog_update.ejs",obj);
});

router.post("/latest_update_blog",async function(req,res){
    var d=req.body;
    var sql=`UPDATE latest_blog
SET 
                  
    latest_blog_date ='${d.latest_blog_date}',               
    latest_blog_post_by ='${d.latest_blog_post_by}',            
    latest_blog_content ='${d.latest_blog_content}',             
    blog_short_description ='${d.blog_short_description}'          
WHERE 
    latest_blog_id ='${d.latest_update_data}';                 
`
var data=await exe(sql);
res.redirect("/admin/latest_blog")
// res.send(data);
});

router.get("/research_blog",async function(req,res){
    var data=await exe(`SELECT * FROM research_blog WHERE research_blog_id = 3`);
    var obj={"old_data":data[0]};
   res.render("admin/research_blog.ejs",obj);
});

router.post("/research_blog",async function(req,res){

    // var d=req.body;
     var research_blog_img = new Date().getTime() + req.files.research_blog_img.name;
     req.files.research_blog_img.mv("public/uploads/"+research_blog_img);

    

    // var sql=`INSERT INTO research_blog( research_blog_title, research_blog_subtitle,research_blog_content,research_blog_img) VALUES
    // ('${d.research_blog_title}','${d.research_blog_subtitale}','${d.research_blog_content}','${research_blog_img}')`;

    // var data=await exe(sql);

    //res.send(data)

    var d=req.body;
    var sql=`UPDATE research_blog
SET 
     
    research_blog_title = '${d.research_blog_title}',         
    research_blog_subtitle = '${d.research_blog_subtitale}',   
    research_blog_content = '${d.research_blog_content}',
    research_blog_img = '${research_blog_img}'
WHERE 
    research_blog_id = '${d.research_blog_id}';                                         
`;

var data=await exe(sql);
//res.send(data);
     res.redirect("/admin/research_blog")
})

router.get("/awesome_features",async function(req,res){
    var data = await exe(`SELECT * FROM awesome_features WHERE awesome_features_id =  1`);
     var obj ={"awesome_features":data[0]};
     res.render("admin/awesome_features.ejs",obj);
   // res.send(obj)

})
router.post("/save_awesome_features",async function(req,res){
    var d = req.body;
    // var sql = `INSERT INTO awesome_features (class_facility, class_facility_text,dell_online_course, dell_online_course_text, global_certification, global_certification_text) VALUES ('${d.class_facility}','${d.class_facility_text}','${d.dell_online_course}','${d.dell_online_course_text}','${d.global_certification}','${d.global_certification_text}')`;

    var sql = `UPDATE awesome_features
    SET class_facility = '${d.class_facility}',
        class_facility_text = '${d.class_facility_text}',
        dell_online_course = '${d.dell_online_course}',
                dell_online_course_text = '${d.dell_online_course_text}',
                global_certification = '${d.global_certification}',
                    global_certification_text = '${d.global_certification_text}'
    WHERE awesome_features_id = '${d.awesome_features_id}';`

    var data = await exe(sql);

    // res.send("data");
    res.redirect("/admin/awesome_features");

})

router.get("/popular_courses",async function(req,res){
    var data = await exe(`SELECT * FROM popular_courses`);
    var obj ={"popular_courses":data};
    res.render("admin/popular_courses.ejs",obj);

})
router.post("/save_popular_course", async function(req, res) {
    
    var d = req.body;
    var files_name = new Date().getTime() + req.files.popular_courses_photo.name;
    req.files.popular_courses_photo.mv("public/uploads/"+files_name);

    var sql = `INSERT INTO popular_courses (popular_courses_photo, popular_courses_text, popular_courses_information) VALUES ('${files_name}','${d.popular_courses_text}','${d.popular_courses_information}')`;

    var data = await exe(sql);
    //  res.send("data");
    res.redirect("/admin/popular_courses");
});

router.get("/edit_popular_course/:popular_course_id",async function(req,res) 
{
    var id = req.params.popular_course_id;
    var data=await exe(`SELECT * FROM popular_courses WHERE popular_course_id='${id}'`);
    var obj={"popular_courses":data[0]};

    res.render("admin/edit_popular_course.ejs",obj);
    
});
router.post("/update_popular_course",async function(req,res){
    var d = req.body;
    var files_name = new Date().getTime() + req.files.popular_courses_photo.name;
    req.files.popular_courses_photo.mv("public/uploads/"+files_name);

    var sql =`UPDATE popular_courses SET popular_courses_text = '${d.popular_courses_text}', popular_courses_information = '${d.popular_courses_information}', popular_courses_photo ='${files_name}'
WHERE popular_course_id='${d.popular_course_id}'
`
var data =await exe(sql)

//res.send(sql);

    res.redirect("/admin/popular_courses")
 })
 router.get("/delete_popular_course/:popular_course_id",async function(req,res){
    var data = await exe(`delete from popular_courses where popular_course_id = '${req.params.popular_course_id}'`);
    res.send("<script>alert('popular_courses Delete Sucessfully');location = '/admin/popular_courses'</script>");
})

router.get("/counts",async function(req,res){
    var data = await exe(`SELECT * FROM counts WHERE count_id =  1`);
    var obj ={"counts":data[0]};
     res.render("admin/counts.ejs",obj);
   // res.send(obj)
})


router.post("/save_counts",async function(req,res){
    var d = req.body;
    // var sql = `INSERT INTO counts (total_student, teacher, Student, happy_students) VALUES ('${d.total_student}','${d.teacher}','${d.Student}','${d.happy_students}')`;

    var sql = `UPDATE counts
    SET total_student = '${d.total_student}',
        teacher = '${d.teacher}',
                Student = '${d.Student}',
                happy_students = '${d.happy_students}'
    WHERE count_id = '${d.count_id}';`

    var data = await exe(sql);

    // res.send("data");
    res.redirect("/admin/counts");

})

router.get("/course_page",async function(req,res){
    var data=await exe(`SELECT * FROM course_category`);
    var obj={"category_data":data};
    res.render("admin/course_page.ejs",obj);
});

router.get("/delete_course/:id",async function(req,res){
var id=req.params.id;
var data=await exe(`DELETE FROM course_category WHERE course_category_id='${id}'`);
//res.send(data);
res.redirect("/admin/course_page");
});

router.get("/course_update/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`SELECT * FROM course_category WHERE course_category_id='${id}' `);
    var obj={"cource_update_data":data[0]};

    res.render("admin/update_course.ejs",obj);
 
});

router.post("/course_update_form",async function(req,res){
    var sql=`UPDATE course_category
SET category_name = '${req.body.category_name}'
WHERE course_category_id='${req.body.category_id}'`;

var data=await exe(sql);
res.redirect("/admin/course_page");
})

router.post("/course_categary_form",async function(req,res){
    var d=req.body;

    var sql=`INSERT INTO course_category(category_name) VALUES ('${d.category_name}')`;
    var data=await exe(sql);

    res.redirect("/admin/course_page");

    //res.send(data);
});

router.get("/course",async function(req,res){
    var data=await exe(`SELECT * FROM course_category `);
    var data2=await exe(`SELECT * FROM courses`);
    var obj={"course_data":data,"course2":data2};


    
   res.render("admin/couser.ejs",obj);
});

router.get("/course_delete/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(` DELETE FROM courses
WHERE course_id='${id}'`);

//res.send(data);
res.redirect("/admin/course");
})

router.get("/update_couse_edit/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`SELECT * FROM courses WHERE course_id='${id}'`);
    var obj={"couse_update_data":data[0]};
    res.render("admin/couse_update_data.ejs",obj)
});

router.post("/couser_update",async function(req,res){
    var d=req.body;
    // CREATE TABLE courses (
    //     course_id INT AUTO_INCREMENT PRIMARY KEY,
    //     course_category_id INT,
    //     subject VARCHAR(255) NOT NULL,
    //     start_date DATE NOT NULL,
    //     time TIME NOT NULL,
    //     teacher_name VARCHAR(255) NOT NULL,
    //     meeting_link VARCHAR(255)
    //     onclick="return confirmDelete()"
        
    // );
    var sql=`UPDATE courses
SET  subject='${d.subject}',start_date='${d.start_date}',time='${d.time}',teacher_name='${d.teacher_name}',meeting_link='${d.meeting_link}'
WHERE course_id='${d.course_id}'`;

var data=await exe(sql);
//res.send(data);
res.redirect("/admin/course");
})

router.post("/couser_page",async function(req,res){
    var d=req.body;

    var sql = `INSERT INTO courses(course_category_id,subject,start_date,time,teacher_name,meeting_link) VALUES 
    ('${d.category_id}','${d.subject}','${d.start_date}','${d.time}','${d.teacher_name}','${d.meeting_link}')`;


    var data=await exe(sql);

    //res.send(data);
    res.redirect("/admin/course")
});

router.get("/level_category",async function(req,res){
    var data=await exe(`SELECT * FROM level_category`);
    var obj={"level_data":data};
   res.render("admin/level_category.ejs",obj);
});

router.get("/delete_level_category/:id",async function(req,res){
   var id=req.params.id;
   var data=await exe(`DELETE FROM level_category
WHERE level_category_id='${id}'`);

//res.send(data);
res.redirect("/admin/level_category");
});

router.get("/level_category/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`SELECT * FROM level_category WHERE level_category_id='${id}'`);
    var obj={"old_level_data":data[0]};

    res.render("admin/level_category_update.ejs",obj);
});

router.post("/level_categary_update",async function(req,res){
    var d=req.body;
   var sql=`UPDATE level_category
SET category_name ='${d.update_cource}' WHERE level_category_id='${d.level_category}'`;

var data=await exe(sql);
//res.send(data);
res.redirect("/admin/level_category");
})

router.post("/level_categary_form",async function(req,res){
    var d=req.body;
    var sql=`INSERT INTO level_category(category_name)values('${d.category_name}')`;
    var data=await exe(sql);

    res.redirect("/admin/level_category");

    //res.send(data);
});

router.get("/level",async function(req,res){
    var data=await exe(`SELECT * FROM level_category`);
    var data2=await exe(`SELECT * FROM level`);
    var obj={"level_data":data,"level":data2};

    res.render("admin/level_page.ejs",obj);
});

router.get("/delete_level/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`DELETE FROM level
WHERE level_id='${id}'`);

//res.send(data);
res.redirect("/admin/level");
});

router.get("/level_update/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`SELECT * FROM level WHERE level_id='${id}'`);
    var obj={"level_update_data":data[0]};
    res.render("admin/level_update_data.ejs",obj);
    
});

router.post("/level_update",async function(req,res){
    var d=req.body;
    var sql=`UPDATE level
SET age = '${d.age}', level_information = '${d.level_information}'
WHERE level_id='${d.level_id}'`;
var data=await exe(sql);
//res.send(data);
res.redirect("/admin/level")
})

router.post("/level_page_form",async function(req,res){
    var d=req.body;

    var sql=`INSERT INTO level(level_category_id,age,level_information) VALUES ('${d.category_id}','${d.age}',
    '${d.level_information}')`;

    var data=await exe(sql);
    //res.send(data);
    res.redirect("/admin/level");
})

module.exports = router;
