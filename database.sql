
Single 
about_company 

company_name
company_mobile
company_email
company_time
company_logo
company_linkedin_link
company_whatsapp_link
company_facebook_name
company_facebook_link
company_youtube_name
company_youtube_link
company_instagram_name
company_instagram_link
company_address

create table about_company (company_id int primary key auto_increment,company_name varchar(100),company_mobile varchar(15),company_email varchar(50),company_time varchar(50),company_logo text,company_linkedin_link text,
company_whatsapp_link text,company_facebook_name varchar(100),company_facebook_link text,company_youtube_name varchar(100),company_youtube_link text,company_instagram_name varchar(100),company_instagram_link text,
company_address text);


insert into about_company(company_name,company_mobile,company_email,company_time,company_logo,company_linkedin_link,company_whatsapp_link,company_facebook_name,company_facebook_link,company_youtube_name,company_youtube_link,company_instagram_name,company_instagram_link,company_address)values('{d.company_name}','{d.company_mobile}','{d.company_email}','{d.company_time}','{d.company_logo}','{d.company_linkedin_link}','{d.company_whatsapp_link}','{d.company_facebook_name}','{d.company_facebook_link}','{d.company_youtube_name}','{d.company_youtube_link}','{d.company_instagram_name}','{d.company_instagram_link}','{d.company_address}');


-- car book
create table carbook (carbook_id int primary key auto_increment,user_name varchar(30),user_mobile varchar(10),user_pick_up_date varchar(100),user_pick_out_date varchar(100),user_pick_up_time varchar(30),user_pick_out_time varchar(30),user_total_people_in_car varchar(10),user_adhar_no varchar(15),user_travel_peoples text,carbookname varchar(50));

--  form on slider
-- enquiry form 
create table enquiry (enq_id int primary key auto_increment,) 
