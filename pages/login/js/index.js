var user = $("#user"),
    pwd = $("#pwd"),
    sigup = $("#sigup-btn"),
    login = $("#login-btn"),
    titles = $("#title span"),
    userInfo = $("#user_info"),
    userIcon = $("#user_icon")
    pwdInfo = $("#pwd_info"),
    pwdIcon = $("#pwd_icon"),
    userReg = /^1[3578]\d{9}$/,
    pwdReg = /^\w{5,12}$/,
    isRepeat = false;       // 记录用户名是否被占用

// 检测用户
function checkUser(){
    var userVal = user.val();
    // 验证手机号是否有效
    console.log(userVal);
    if (!userReg.test(userVal)) {
        userInfo.html('手机号码无效！') ;
        userIcon.attr('class','no'); 
    } else {
        userInfo.html('') ;
        userIcon.attr('class','');
        $.ajax({
            type:"GET",
            url:'./server/isUserRepeat.php',
            timeout: 3500,
            success:function(data){       
                console.log('success');   
                    if(data.code == 1){
                        userIcon.attr('class','ok');
                        isRepeat = false;
                    }else if(data.code == 0){
                        userIcon.attr('class','no');
                        isRepeat = true;
                        userInfo.html(data.msg);
                    }else{
                        userInfo.tml('检测失败，请重试...');
                    }
                }})
    }
}

// 检测密码
function checkPwd(){
    var pwdVal = pwd.val();
    if(!pwdReg.test(pwdVal)){
        pwdInfo.html('请输入5到12位的字母、数字及下划线');
        pwdIcon.attr('class','no');
    }else{
        pwdInfo.html('') ;
        pwdIcon.attr('class','ok');
    }
}

// 注册
function register(){
    var user_val = user.val(),
        pwd_val = pwd.val();
    // 如果手机号有效且没有被占用，同时密码合法，方可注册
    if(userReg.test(user_val) && pwdReg.test(pwd_val) && !isRepeat){
       // 发起请求，实现注册
       $.ajax({
           url:"./server/register.php",
           method:"post",
           data:{username:user_val,userpwd:pwd_val},
           success:function(data){
               alert("注册成功，请登录！");
               // 调用显示登录界面
               showLogin();
               // 清空文本框
               user.value = "";
               pwd.value = "";
           },
           error:function(){
               pwdInfo.innerHTML = '注册失败，请重试！';
           }
       })
    }
}

// 显示登录
function showLogin(){
    // 载入登录界面，登录高亮显示
    titles.attr('class','');
    titles.eq(0).attr('class','current');
    login.attr('class','show');
    sigup.attr('class','');
}

// 显示注册
function showSigup(){
    // 载入注册界面，注册高亮显示
    titles.attr('class','');
    titles.eq(1).attr('class','current');
    login.attr('class','');
    sigup.attr('class','show');
}

user.blur(checkUser);
pwd.blur(checkPwd);
sigup.click(function (e) {
    register(); 
    e.preventDefault();
    
});
titles.eq(0).click(function (e) {
    showLogin(); 
    e.preventDefault();
    
});
titles.eq(1).click(function (e) {
    showSigup(); 
    e.preventDefault();
    
});
