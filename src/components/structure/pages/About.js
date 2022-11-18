import Separator from "../Separator";

const About = () => {
  return (
    <div className="container">
      <header className="jumbotron text-center">
          <h1><strong>UNI</strong></h1>
          <Separator.Separator2/>
          <h4><strong>MatMod</strong> Распределенная модель взаимодействия популяций</h4>
          <Separator.Separator1/>
          <h5>Сборка версии 1.1.0</h5>
      </header>
    </div>
  );
};

export default About;
