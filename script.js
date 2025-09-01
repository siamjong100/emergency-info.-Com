// ডিফল্ট সদস্যদের লিস্ট
let members = JSON.parse(localStorage.getItem("members")) || [
  { name: "ছেনেহ",  phone: "+8801892479077" },
  { name: "হামজা",  phone: "+8801316258072" },
  { name: "রাফিন",    phone: "+8801644796912" },
  { name: "জাহিন",  phone: "+8801540665876" },
  { name: "সজিব",  phone: "+8801897520270" },
  { name: "মুক্তি",   phone: "+8801630537613" },
  { name: "মাহান্নাত", phone: "+8801811981674" },
  { name: "দিহাম",   phone: "+8801611433833" },
  { name: "সাদমান",  phone: "+88013774882" }
];

// ডিফল্ট হোটেল তথ্য
let hotelData = JSON.parse(localStorage.getItem("hotelData")) || {
  name: "Hotel Kuakata Palace",
  phone: "+8801818523491",
  website: "",
  map: "https://maps.app.goo.gl/gqdThqDkEjfkSEkr5"
};

let noteData = localStorage.getItem("noteData") || "";

function renderMembers() {
  const list = document.getElementById("memberList");
  list.innerHTML = "";
  members.forEach(m => {
    let li = document.createElement("li");
    li.innerHTML = `${m.name} - <span class="phone">${m.phone}</span> 
      <button class="copyBtn" onclick="copyText('${m.phone}')">📋 কপি</button>`;
    list.appendChild(li);
  });
}
renderMembers();

function addMember() {
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  if(name && phone){
    members.push({name, phone});
    localStorage.setItem("members", JSON.stringify(members));
    renderMembers();
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ নাম্বার কপি হয়েছে: " + text);
  });
}

function saveHotel() {
  hotelData = {
    name: document.getElementById("hotelName").value,
    phone: document.getElementById("hotelPhone").value,
    website: document.getElementById("hotelWebsite").value,
    map: document.getElementById("hotelMap").value
  };
  localStorage.setItem("hotelData", JSON.stringify(hotelData));
  showHotel();
}

function showHotel() {
  if(hotelData.name || hotelData.phone || hotelData.website || hotelData.map){
    document.getElementById("hotelInfo").innerHTML = `
      <b>🏨 হোটেল:</b> ${hotelData.name || '---'} <br>
      <b>📞 ফোন:</b> ${hotelData.phone || '---'} <br>
      <b>🌐 ওয়েবসাইট:</b> ${hotelData.website ? `<a href="${hotelData.website}" target="_blank">${hotelData.website}</a>` : '---'}<br>
      <b>📍 লোকেশন:</b> <a href="${hotelData.map}" target="_blank">Google Maps</a>
      <div style="margin-top:10px;">
        <iframe src="https://www.google.com/maps?q=${encodeURIComponent(hotelData.name)}&output=embed" 
          width="100%" height="250" style="border:0; border-radius:10px;" allowfullscreen></iframe>
      </div>
    `;
  }
}
showHotel();

function saveNote() {
  noteData = document.getElementById("extraNote").value;
  localStorage.setItem("noteData", noteData);
  showNote();
}

function showNote() {
  if(noteData){
    document.getElementById("noteShow").innerText = noteData;
    document.getElementById("extraNote").value = noteData;
  }
}
showNote();

function generateQR() {
  let info = `🌊 কুয়াকাটা ট্যুর ইনফো\n\n📅 রওনা: ২ তারিখ (মঙ্গলবার) রাত ১০:৪৫ (সেভেন ডিলাক্স, কোচ ১০৩) set plan D1,D2,D3,D4,E1,E3,E4 \n📅 ফিরবো: ৬ তারিখ (শনিবার) রাত\n\n`;

  members.forEach(m => {
    info += `${m.name}: ${m.phone}\n`;
  });

  info += `\n🏨 হোটেল: ${hotelData.name || '---'}\n📞 ফোন: ${hotelData.phone || '---'}\n🌐 ওয়েবসাইট: ${hotelData.website || '---'}\n📍 লোকেশন: ${hotelData.map || '---'}\n\n📝 নোট: ${noteData || '---'}`;

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: info,
    width: 220,
    height: 220
  });
}
