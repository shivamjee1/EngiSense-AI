import { Link } from "react-router-dom";

function Landing() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#111827",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          background: "#111827",
          color: "#ffffff",
          padding: "18px 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          EngiSense AI
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <a href="#about" style={navLinkStyle}>
            About
          </a>

          <a href="#features" style={navLinkStyle}>
            Features
          </a>

          <a href="#how-it-works" style={navLinkStyle}>
            How It Works
          </a>

          <Link to="/login" style={navLinkStyle}>
            Login
          </Link>

          <Link to="/register" style={primaryButtonStyle}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 30px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "20px",
            border: "1px solid #2563eb",
            color: "#2563eb",
            fontWeight: "600",
            fontSize: "13px",
            marginBottom: "20px",
          }}
        >
          ENGINEERING INTELLIGENCE PLATFORM
        </div>

        <h1
          style={{
            fontSize: "56px",
            lineHeight: "1.1",
            margin: "0 auto 24px",
            maxWidth: "850px",
          }}
        >
          Turn Engineering Data Into Intelligent Insights
        </h1>

        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            fontSize: "19px",
            lineHeight: "1.7",
            color: "#4b5563",
          }}
        >
          Analyze engineering datasets, explore technical documents,
          visualize important parameters, and ask AI-powered engineering
          questions using evidence from your data and knowledge base.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "35px",
          }}
        >
          <Link
            to="/register"
            style={{
              ...primaryButtonStyle,
              padding: "14px 28px",
              fontSize: "16px",
            }}
          >
            Get Started
          </Link>

          <Link
            to="/login"
            style={{
              padding: "13px 27px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              color: "#111827",
              textDecoration: "none",
              fontWeight: "600",
              background: "#ffffff",
            }}
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 30px 90px",
        }}
      >
        <SectionHeading
          title="Engineering Intelligence in One Platform"
          description="A unified workflow for engineering data, technical documents, analytics, and AI."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "22px",
            marginTop: "40px",
          }}
        >
          <FeatureCard
            title="Dataset Analysis"
            text="Upload engineering datasets and perform deterministic statistical analysis."
          />

          <FeatureCard
            title="Engineering Visualization"
            text="Explore trends, correlations, distributions, and important engineering parameters."
          />

          <FeatureCard
            title="Document Intelligence"
            text="Upload technical PDF and DOCX documents and retrieve relevant engineering knowledge."
          />

          <FeatureCard
            title="AI Engineering Assistant"
            text="Combine technical documentation with deterministic analysis to generate evidence-based insights."
          />
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        style={{
          background: "#111827",
          color: "#ffffff",
          padding: "80px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <SectionHeading
            dark
            title="How EngiSense AI Works"
            description="From raw engineering data to an AI-assisted engineering assessment."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "20px",
              marginTop: "45px",
            }}
          >
            {[
              ["01", "Upload Dataset"],
              ["02", "Run Analysis"],
              ["03", "Upload Documents"],
              ["04", "Ask Engineering Questions"],
              ["05", "Get AI Insights"],
            ].map(([number, title]) => (
              <div
                key={number}
                style={{
                  padding: "25px",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    color: "#60a5fa",
                    fontWeight: "700",
                    marginBottom: "12px",
                  }}
                >
                  {number}
                </div>

                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                >
                  {title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "90px 30px",
          textAlign: "center",
        }}
      >
        <SectionHeading
          title="About EngiSense AI"
          description="EngiSense AI combines deterministic engineering analytics, technical document retrieval, and generative AI into a single engineering intelligence workflow."
        />

        <p
          style={{
            marginTop: "25px",
            color: "#4b5563",
            lineHeight: "1.8",
            fontSize: "16px",
          }}
        >
          The platform is designed so that numerical engineering analysis
          is performed by deterministic analytics tools, while AI is used
          to interpret and explain the available evidence.
        </p>
        
          <div
            style={{
            marginTop: "28px",
            display: "flex",
            justifyContent: "center",
            }}
        >
            <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 18px",
                borderRadius: "999px",
                background: "#eef4ff",
                border: "1px solid #d8e5ff",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "500",
            }}
            >
            <span style={{ color: "#2563eb", fontWeight: "700" }}>
                Built by Shivam Jee
            </span>

            <span
                style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#94a3b8",
                }}
            />

            <span>IIIT Manipur</span>
            </div>
        </div>
        
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#eaf1ff",
          padding: "70px 30px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px" }}>
          Start Exploring Your Engineering Data
        </h2>

        <p
          style={{
            color: "#4b5563",
            marginBottom: "28px",
          }}
        >
          Create an account and start building engineering insights.
        </p>

        <Link
          to="/register"
          style={{
            ...primaryButtonStyle,
            display: "inline-block",
            padding: "14px 28px",
          }}
        >
          Create Your Account
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#111827",
          color: "#9ca3af",
          padding: "25px",
          textAlign: "center",
        }}
      >
        <div className="footer-credit">
            <span>EngiSense AI</span>
            <span className="footer-divider"> • </span>
            <span>Developed by Shivam Jee</span>
            <span className="footer-divider"> • </span>
            <span>IIIT Manipur</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "28px",
        minHeight: "150px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>

      <p
        style={{
          color: "#6b7280",
          lineHeight: "1.6",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function SectionHeading({
  title,
  description,
  dark = false,
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          fontSize: "34px",
          marginBottom: "12px",
          color: dark ? "#ffffff" : "#111827",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: dark ? "#d1d5db" : "#6b7280",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </div>
  );
}

const navLinkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: "500",
};

const primaryButtonStyle = {
  background: "#2563eb",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "8px",
  padding: "10px 18px",
  fontWeight: "600",
};

export default Landing;