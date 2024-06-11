function SplashScreen() {
    return (
      <div className="splashcreen">
        <div className="background-images">
            <div className="background-images-image left-image">
                <img src={window.location.origin + "/splash-screen-left.png"} />
            </div>
            <div className="background-images-image right-image">
                <img src={window.location.origin + "/splash-screen-right.png"} />
            </div>
        </div>
        <div className="splashcreen-content">
            <div className="splashcreen-content-title">
                <span>Воїни Волі: Від Гетьманщини до УПА</span>
            </div>
            <div className="splashcreen-content-text">
                <span>Цей календар створено з метою надання користувачам доступу до організованої інформації про важливі історичні події та видатних осіб, що дуже актуально в наш час. Створення такого календаря сприяє збереженню культурної ідентичності та історичної пам'яті, підвищує обізнаність про національні події, що формують колективну пам'ять суспільства.</span>
            </div>
        </div>
      </div>
    );
  }
  
  export default SplashScreen;
  