import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../components/TermsOfUse/TermsOfUse.css";

function TermsOfUse() {
  return (
    <>
      <Header />
      <main className="terms-container">
        <div className="terms-box">
          <h1 className="terms-title">Política Geral e Termos de Uso</h1>
          <div className="terms-content leading-relaxed space-y-4 text-justify text-base p-4 max-w-4xl mx-auto">
            <p>
              No intuito de garantir o uso adequado do site, bem como para
              definir as regras que deverão ser observadas pelos internautas que
              os visitam, também garantindo a sua privacidade, a{" "}
              <strong>YumeAnimes</strong> define e estipula os presentes Termos
              de Uso em conjunto à Política de Privacidade e outros termos e
              condições, aplicável a todos os usuários do site, permitindo que o
              uso do mesmo se dê de maneira correta e responsável.
            </p>

            <p>
              Abaixo constam as regras aplicáveis para a utilização do site, bem
              como para o envio de comentários em páginas internas:
            </p>

            <p>
              <strong>1.</strong> Ao utilizar o site, os internautas declaram
              ter lido e concordado com a presente Política Geral e Termos de
              Uso, bem como com a Política de Privacidade.
            </p>

            <p>
              <strong>2.</strong> O conteúdo disponibilizado possui caráter
              apenas de divulgação. É proibida a reprodução com fins comerciais,
              sob pena de violação de direitos intelectuais.
            </p>

            <p>
              <strong>3.</strong> O site pode disponibilizar áreas para
              comentários relacionados aos conteúdos. Os usuários são
              responsáveis por suas publicações.
            </p>

            <p>
              <strong>3.1.</strong> O colaborador é o único responsável pelos
              comentários que publicar. A YumeAnimes não se responsabiliza pelo
              conteúdo dos mesmos.
            </p>

            <p>
              <strong>4.</strong> A YumeAnimes não será responsável pelas
              opiniões publicadas. Comentários não serão revisados ou moderados
              previamente.
            </p>

            <p>
              <strong>5.</strong> É proibido publicar imagens de pessoas sem
              autorização.
            </p>

            <p>
              <strong>6.</strong> A administração do site pode excluir qualquer
              conteúdo sem aviso prévio, especialmente se violar leis ou normas
              internas.
            </p>

            <p>
              <strong>7.</strong> Comentários podem ser removidos sem aviso nos
              seguintes casos:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                7.1. Infração à legislação, crimes contra a honra, concorrência
                desleal ou direitos autorais.
              </li>
              <li>7.2. Reprodução de notícias sem citar a fonte.</li>
              <li>
                7.3. Divulgação de informações pessoais próprias ou de
                terceiros.
              </li>
              <li>7.4. Conteúdo publicitário ou autopromoção.</li>
              <li>
                7.5. Comentários ofensivos, que prejudiquem a imagem do site ou
                terceiros.
              </li>
              <li>7.6. Comentários fora dos temas abordados.</li>
              <li>7.7. Violação das políticas do site.</li>
              <li>7.8. Conteúdo pornográfico ou ilegal envolvendo menores.</li>
              <li>7.9. Incitação ao preconceito ou discriminação.</li>
            </ul>

            <p>
              <strong>8.</strong> A YumeAnimes pode banir usuários do sistema de
              comentários a seu critério, sem aviso.
            </p>

            <p>
              <strong>9.</strong> Representantes do site podem responder a
              comentários com contra-argumentos.
            </p>

            <p>
              <strong>10.</strong> Comentários enviados autorizam o acesso a
              apelidos e imagens de perfil pelo público.
            </p>

            <p>
              <strong>11.</strong> O internauta é responsável por manter em
              sigilo suas informações de login e pelas ações feitas com sua
              conta.
            </p>

            <p>
              <strong>12.</strong> A YumeAnimes se compromete a proteger a
              privacidade dos usuários:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                12.1. Não divulgar e-mails ou dados pessoais sem autorização,
                exceto a parceiros.
              </li>
              <li>
                12.2. Uso de cookies será limitado ao necessário; o bloqueio
                pode afetar funcionalidades.
              </li>
            </ul>

            <p>
              <strong>13.</strong> Ao aceitar o termo, o usuário garante que
              seus conteúdos não violam direitos de terceiros.
            </p>

            <p>
              <strong>14.</strong> O colaborador se compromete a agir com ética
              e respeito aos demais membros.
            </p>

            <p>
              <strong>15.</strong> Ao enviar comentários, o internauta declara
              que leu e aceita os termos, autorizando sua publicação definitiva.
            </p>

            <p>
              <strong>16.</strong> A YumeAnimes pode armazenar informações de
              acesso como forma de identificar os usuários, se necessário.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TermsOfUse;
