import './Footer.css';

export default function Footer(){
return(
   <footer id="Footer">
      <div className="footertop">
        <div className="box">
          <span id="contact1">Бидэнтэй холбоо барих</span>
          <span>+976 9457 4655</span>
          <span>handinerdene2@gmail.com</span>
          <span>Address, city / Ulaanbaatar</span>
        </div>

        <div className="box">
          <span id="services">Бидний үйлчилгээ</span>
          <span>Нүүр хуудас</span>
          <span>Байр түрээслэх</span>
          <span>Rent</span>
        </div>

        <div className="box">
          <span id="Quick">Quick Link</span>
          <span>Knowledge Base</span>
          <span>FAQ</span>
          <span>Contact</span>
        </div>

        <div className="box">
          <span id="logo">Private Gerhub Rental</span>
          <button type="button">Бидэнтэй холбогдох</button>
        </div>
      </div>

      <div className="footerbottom">
        <span>Privacy Policy</span>
        <span className="divider">|</span>
        <span>Use of term</span>
      </div>
    </footer>
)
} 