$(document).ready((function(){function t(t){return"<span>"+(t=("00"+t).substr(-2))[0]+"</span><span>"+t[1]+"</span>"}$("a[href^='#']").click((function(){var t=$(this).attr("href");return $("html, body").animate({scrollTop:$(t).offset().top+"px"}),!1})),function e(){var n=new Date,a=new Date;a.setHours(23),a.setMinutes(59),a.setSeconds(59),23===n.getHours()&&59===n.getMinutes()&&59===n.getSeconds&&a.setDate(a.getDate()+1);var o=Math.floor((a.getTime()-n.getTime())/1e3),i=Math.floor(o/3600);o-=3600*i;var s=Math.floor(o/60);o-=60*s,$(".timer .hours").html(t(i)),$(".timer .minutes").html(t(s)),$(".timer .seconds").html(t(o)),setTimeout(e,200)}(),$(".order_form").submit((function(){return""==$(this).find("input[name='name']").val()&&""==$(this).find("input[name='phone']").val()?(alert("Введите Ваши имя и телефон"),$(this).find("input[name='name']").focus(),!1):""==$(this).find("input[name='name']").val()?(alert("Введите Ваше имя"),$(this).find("input[name='name']").focus(),!1):""!=$(this).find("input[name='phone']").val()||(alert("Введите Ваш телефон"),$(this).find("input[name='phone']").focus(),!1)}))})),$(window).on("load",(function(){$(".owl-carousel").owlCarousel({items:1,loop:!0,autoHeight:!0,smartSpeed:300,mouseDrag:!1,pullDrag:!1,dots:!1,nav:!0,navText:""})}));

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("order_form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.querySelector("input[name='name']").value.trim();
    const phone = form.querySelector("input[name='phone']").value.trim();

    if (!name || !phone) {
      alert("Введите Ваше имя и телефон");
      return;
    }

    try {
      const response = await fetch('/config.json');
      const config = await response.json();

      const token = config.token;
      const chatId = config.chatId;

      const message = `<b>Имя пользователя:</b> ${name}\n<b>Телефон:</b> ${phone}`;

      const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      if (telegramResponse.ok) {
        window.location.href = "thanks.html";
      } else {
        console.error("Ошибка при отправке данных в Telegram:", telegramResponse.statusText);
        alert("Ошибка при отправке данных. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка загрузки конфигурации или сети:", error);
      alert("Ошибка сети. Проверьте подключение.");
    }
  });
});
