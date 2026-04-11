import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f6f1fb",
        color: "#2b1740",
        overflow: "hidden",
      }}
    >
      <section
        style={{
          position: "relative",
          background:
            "linear-gradient(135deg, #ff8b7b 0%, #ff5f97 18%, #d14be0 42%, #8a42ff 72%, #6337ec 100%)",
          color: "#fff",
          paddingBottom: "120px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 10% 18%, rgba(255,255,255,0.16), transparent 18%), radial-gradient(circle at 82% 20%, rgba(255,195,120,0.18), transparent 16%), radial-gradient(circle at 70% 72%, rgba(255,255,255,0.09), transparent 18%)",
            pointerEvents: "none",
          }}
        />

        <header
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "26px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Image
              src="/logo-67flow.png"
              alt="67Flow"
              width={84}
              height={84}
              style={{
                borderRadius: "22px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                background: "rgba(255,255,255,0.12)",
              }}
            />
            <div>
              <h1 style={{ margin: 0, fontSize: "34px", lineHeight: 1 }}>67Flow</h1>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "rgba(255,255,255,0.88)",
                  fontSize: "18px",
                }}
              >
                Automação para Instagram e Facebook
              </p>
            </div>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <a href="#recursos" style={navLink}>
              Recursos
            </a>
            <a href="#como-funciona" style={navLink}>
              Como funciona
            </a>
            <Link href="/login" style={topSecondaryButton}>
              Login
            </Link>
            <Link href="/register" style={topPrimaryButton}>
              Criar conta
            </Link>
          </nav>
        </header>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "24px 20px 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div>
            <div style={pillStyle}>Instagram, Facebook, leads e automações</div>

            <h2
              style={{
                margin: "22px 0 0",
                fontSize: "clamp(42px, 7vw, 78px)",
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                maxWidth: "680px",
              }}
            >
              Automatize mensagens no Instagram e Facebook
            </h2>

            <p
              style={{
                marginTop: "24px",
                maxWidth: "640px",
                fontSize: "23px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              Centralize conversas, responda mais rápido, organize leads e crie
              automações que fazem seu atendimento parecer profissional de verdade.
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                marginTop: "30px",
              }}
            >
              <Link href="/register" style={heroPrimaryButton}>
                Começar agora
              </Link>
              <Link href="/dashboard/integrations" style={heroSecondaryButton}>
                Ver integrações
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                gap: "18px",
                flexWrap: "wrap",
                marginTop: "28px",
                color: "rgba(255,255,255,0.85)",
                fontSize: "15px",
              }}
            >
              <span>• Instagram Direct</span>
              <span>• Facebook Messenger</span>
              <span>• Fluxos automáticos</span>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              minHeight: "680px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "640px",
                height: "640px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,188,86,0.34) 0%, rgba(255,112,165,0.28) 25%, rgba(162,90,255,0.24) 48%, rgba(112,63,237,0.12) 62%, transparent 74%)",
                filter: "blur(10px)",
              }}
            />

            <OrganicBlob
              width={420}
              height={260}
              top="110px"
              left="20px"
              rotate="-18deg"
              bg="linear-gradient(135deg, rgba(255,156,77,0.95), rgba(255,93,160,0.82))"
            />
            <OrganicBlob
              width={300}
              height={180}
              top="80px"
              right="10px"
              rotate="22deg"
              bg="linear-gradient(135deg, rgba(186,102,255,0.92), rgba(255,117,190,0.78))"
            />
            <OrganicBlob
              width={420}
              height={220}
              bottom="70px"
              left="30px"
              rotate="14deg"
              bg="linear-gradient(135deg, rgba(255,138,78,0.80), rgba(196,85,255,0.70))"
            />
            <OrganicBlob
              width={260}
              height={170}
              bottom="36px"
              right="30px"
              rotate="-16deg"
              bg="linear-gradient(135deg, rgba(107,102,255,0.82), rgba(255,88,170,0.68))"
            />

            <BubbleCircle
              size={82}
              top="154px"
              left="78px"
              color="linear-gradient(135deg, #ff9e4a, #ff4f9e)"
            />
            <BubbleCircle
              size={54}
              top="250px"
              left="48px"
              color="linear-gradient(135deg, #ffffff55, #ffffff18)"
            />
            <BubbleCircle
              size={62}
              top="120px"
              right="90px"
              color="linear-gradient(135deg, #8f65ff, #ff6abc)"
            />
            <BubbleCircle
              size={42}
              top="306px"
              right="66px"
              color="linear-gradient(135deg, #ffb04d, #ff7d97)"
            />
            <BubbleCircle
              size={76}
              bottom="118px"
              left="96px"
              color="linear-gradient(135deg, #ff9656, #d65cff)"
            />
            <BubbleCircle
              size={58}
              bottom="56px"
              right="112px"
              color="linear-gradient(135deg, #7a65ff, #b24fff)"
            />

            <div
              style={{
                position: "relative",
                width: "310px",
                height: "580px",
                borderRadius: "40px",
                background: "linear-gradient(180deg, #2b274b, #19172d)",
                padding: "14px",
                boxShadow: "0 40px 90px rgba(51, 13, 98, 0.42)",
                transform: "rotate(7deg)",
                zIndex: 3,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "126px",
                  height: "24px",
                  borderRadius: "999px",
                  background: "#151225",
                  zIndex: 4,
                }}
              />

              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "30px",
                  overflow: "hidden",
                  position: "relative",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.90), rgba(237,228,255,0.92) 35%, rgba(214,196,255,0.84) 100%)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 50% 22%, rgba(255,160,190,0.30), transparent 24%), radial-gradient(circle at 30% 70%, rgba(160,110,255,0.18), transparent 24%)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "48px",
                    left: "24px",
                    right: "24px",
                    background: "linear-gradient(135deg, #ffd4e4, #f8c7db)",
                    borderRadius: "18px",
                    padding: "14px 16px",
                    boxShadow: "0 8px 18px rgba(223, 133, 177, 0.20)",
                  }}
                >
                  <div
                    style={{
                      width: "72%",
                      height: "10px",
                      background: "#fff",
                      borderRadius: "999px",
                      marginBottom: "8px",
                      opacity: 0.95,
                    }}
                  />
                  <div
                    style={{
                      width: "46%",
                      height: "8px",
                      background: "#fff",
                      borderRadius: "999px",
                      opacity: 0.7,
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "154px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "146px",
                    height: "146px",
                    borderRadius: "34px",
                    background: "linear-gradient(135deg, #7e54ff, #b14bff)",
                    boxShadow: "0 18px 36px rgba(117, 71, 224, 0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "104px",
                      height: "104px",
                      borderRadius: "28px",
                      background: "linear-gradient(180deg, #faf3ff, #d7c8ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
                    }}
                  >
                    <div
                      style={{
                        width: "66px",
                        height: "38px",
                        borderRadius: "18px",
                        background: "linear-gradient(135deg, #7e54ff, #b14bff)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "#fff",
                        }}
                      />
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "#fff",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "332px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "176px",
                    borderRadius: "24px",
                    background: "linear-gradient(135deg, #7f5bff, #b04bff)",
                    padding: "16px 16px",
                    boxShadow: "0 14px 28px rgba(119, 76, 219, 0.30)",
                  }}
                >
                  <div
                    style={{
                      width: "78%",
                      height: "10px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.95)",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    style={{
                      width: "54%",
                      height: "8px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.55)",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "22px",
                    left: "18px",
                    right: "18px",
                    height: "52px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.46)",
                  }}
                />
              </div>

              <FloatingMiniCard
                top="152px"
                left="-68px"
                icon="◎"
                bg="linear-gradient(135deg, #ff9d4a, #ff5b9b)"
                rotate="-8deg"
              />

              <FloatingMiniCard
                top="276px"
                right="-62px"
                icon="✉"
                bg="linear-gradient(135deg, #8f65ff, #d450ff)"
                rotate="8deg"
              />

              <SocialBall
                top="182px"
                right="-52px"
                label="f"
                bg="linear-gradient(135deg, #54a0ff, #3f61ff)"
                size={78}
              />

              <SocialBall
                top="220px"
                left="-22px"
                label="1"
                bg="linear-gradient(135deg, #ff8e5e, #ff3f91)"
                size={40}
              />

              <SocialBall
                bottom="126px"
                left="-28px"
                label="≡"
                bg="linear-gradient(135deg, #ffb049, #ff77a3)"
                size={62}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "-1px",
            height: "130px",
            background: "#f6f1fb",
            borderTopLeftRadius: "55% 100%",
            borderTopRightRadius: "55% 100%",
          }}
        />
      </section>

      <section
        id="recursos"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "56px 20px 90px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "34px" }}>
          <p
            style={{
              margin: 0,
              color: "#7a3cff",
              fontWeight: 800,
              fontSize: "18px",
            }}
          >
            Recursos principais
          </p>
          <h3
            style={{
              margin: "14px 0 0",
              fontSize: "clamp(34px, 5vw, 56px)",
              lineHeight: 1.08,
              color: "#5a2ae0",
            }}
          >
            Ferramentas para transformar conversa em resultado
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "24px",
          }}
        >
          <FeatureCard
            emoji="🤖"
            title="Respostas automáticas"
            text="Configure mensagens iniciais e acelere seu atendimento sem depender de resposta manual o tempo todo."
          />
          <FeatureCard
            emoji="⏰"
            title="Agendamento de mensagens"
            text="Planeje ações, follow-ups e respostas em horários estratégicos para não perder oportunidades."
          />
          <FeatureCard
            emoji="📊"
            title="Métricas e insights"
            text="Acompanhe o desempenho das conversas, leads gerados e evolução da operação."
          />
          <FeatureCard
            emoji="💬"
            title="Inbox multicanal"
            text="Centralize Instagram e Facebook em um único fluxo para organizar melhor sua rotina."
          />
        </div>
      </section>

      <section
        id="como-funciona"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "0 20px 90px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff, #f3ecff)",
            borderRadius: "34px",
            padding: "34px",
            boxShadow: "0 18px 50px rgba(111, 70, 170, 0.10)",
            border: "1px solid rgba(120,90,180,0.10)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            <StepCard
              number="01"
              title="Conecte sua conta"
              text="Integre Instagram e Facebook para começar a centralizar tudo no 67Flow."
            />
            <StepCard
              number="02"
              title="Organize seus leads"
              text="Classifique contatos, acompanhe oportunidades e evite perder atendimento."
            />
            <StepCard
              number="03"
              title="Automatize o fluxo"
              text="Crie respostas e rotinas para ganhar tempo e atender melhor."
            />
            <StepCard
              number="04"
              title="Escale com padrão"
              text="Dê mais consistência ao atendimento e aumente sua percepção de profissionalismo."
            />
          </div>
        </div>
      </section>

      <footer
        style={{
          textAlign: "center",
          padding: "26px 20px 38px",
          color: "rgba(70,45,110,0.72)",
          fontWeight: 600,
        }}
      >
        Criado por Marcelo Rebola
      </footer>
    </main>
  );
}

function FeatureCard({
  emoji,
  title,
  text,
}: {
  emoji: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.72)",
        borderRadius: "26px",
        padding: "28px 24px",
        textAlign: "center",
        boxShadow: "0 12px 36px rgba(125, 88, 180, 0.10)",
        border: "1px solid rgba(160,130,210,0.14)",
      }}
    >
      <div
        style={{
          width: "88px",
          height: "88px",
          margin: "0 auto 18px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          background: "linear-gradient(135deg, #ffe8f5, #efe5ff)",
        }}
      >
        {emoji}
      </div>

      <h4
        style={{
          margin: "0 0 12px",
          fontSize: "30px",
          lineHeight: 1.1,
          color: "#6e35d7",
        }}
      >
        {title}
      </h4>

      <p
        style={{
          margin: 0,
          color: "#7a6499",
          lineHeight: 1.7,
          fontSize: "18px",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "22px",
        padding: "22px",
        border: "1px solid rgba(120,90,180,0.10)",
      }}
    >
      <div
        style={{
          color: "#ff4fa3",
          fontWeight: 800,
          fontSize: "14px",
          letterSpacing: "0.08em",
          marginBottom: "10px",
        }}
      >
        {number}
      </div>
      <h4
        style={{
          margin: "0 0 10px",
          fontSize: "22px",
          color: "#5a2ae0",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          margin: 0,
          color: "#725e8f",
          lineHeight: 1.7,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function OrganicBlob({
  width,
  height,
  top,
  right,
  bottom,
  left,
  rotate,
  bg,
}: {
  width: number;
  height: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  rotate: string;
  bg: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        top,
        right,
        bottom,
        left,
        background: bg,
        borderRadius: "58% 42% 63% 37% / 41% 57% 43% 59%",
        transform: `rotate(${rotate})`,
        filter: "blur(2px)",
        opacity: 0.95,
      }}
    />
  );
}

function BubbleCircle({
  size,
  top,
  right,
  bottom,
  left,
  color,
}: {
  size: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  color: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        right,
        bottom,
        left,
        borderRadius: "50%",
        background: color,
        boxShadow: "0 16px 30px rgba(78, 27, 122, 0.14)",
      }}
    />
  );
}

function FloatingMiniCard({
  top,
  right,
  left,
  icon,
  bg,
  rotate,
}: {
  top?: string;
  right?: string;
  left?: string;
  icon: string;
  bg: string;
  rotate: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        right,
        left,
        width: "74px",
        height: "74px",
        borderRadius: "22px",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: "28px",
        fontWeight: 800,
        boxShadow: "0 18px 28px rgba(79, 22, 132, 0.22)",
        transform: `rotate(${rotate})`,
      }}
    >
      {icon}
    </div>
  );
}

function SocialBall({
  top,
  right,
  bottom,
  left,
  label,
  bg,
  size,
}: {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  label: string;
  bg: string;
  size: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        right,
        bottom,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size > 60 ? "34px" : "18px",
        fontWeight: 900,
        boxShadow: "0 18px 30px rgba(76, 29, 128, 0.24)",
      }}
    >
      {label}
    </div>
  );
}

const navLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.94)",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: "16px",
};

const topPrimaryButton: React.CSSProperties = {
  textDecoration: "none",
  padding: "14px 22px",
  borderRadius: "14px",
  color: "#fff",
  fontWeight: 800,
  background: "linear-gradient(135deg, #ffb366, #ff6f91)",
  boxShadow: "0 12px 24px rgba(255, 130, 120, 0.24)",
};

const topSecondaryButton: React.CSSProperties = {
  textDecoration: "none",
  padding: "14px 22px",
  borderRadius: "14px",
  color: "#fff",
  fontWeight: 800,
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.18)",
};

const heroPrimaryButton: React.CSSProperties = {
  textDecoration: "none",
  padding: "16px 26px",
  borderRadius: "16px",
  color: "#fff",
  fontWeight: 800,
  background: "linear-gradient(135deg, #ffb366, #ff5e8e)",
  boxShadow: "0 16px 30px rgba(255, 110, 120, 0.25)",
  display: "inline-block",
  fontSize: "17px",
};

const heroSecondaryButton: React.CSSProperties = {
  textDecoration: "none",
  padding: "16px 26px",
  borderRadius: "16px",
  color: "#fff",
  fontWeight: 800,
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.18)",
  display: "inline-block",
  fontSize: "17px",
};

const pillStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.16)",
  color: "rgba(255,255,255,0.94)",
  fontWeight: 700,
  fontSize: "14px",
};