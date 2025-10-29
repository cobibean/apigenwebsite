import AppImage from "@/components/AppImage";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio?: string;
}

interface TeamProps {
  title: string;
  members: TeamMember[];
}

export default function Team({ title, members }: TeamProps) {
  return (
    <section className="relative bg-[var(--bg)] py-16 md:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-[5%] top-[20%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_rgba(174,85,33,0.15)_0%,_rgba(250,250,250,0)_70%)] blur-2xl md:right-[8%]"
        aria-hidden="true"
      />
      
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-balance font-semibold tracking-tight text-[var(--primary)] text-[clamp(2rem,3.2vw,2.8rem)] lg:text-[clamp(2.2rem,2.8vw,3rem)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {title}
          </h2>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-[var(--border)] group-hover:border-[var(--accent)] transition-colors duration-300 shadow-[0px_16px_32px_rgba(19,21,21,0.06)] group-hover:shadow-[0px_24px_48px_rgba(19,21,21,0.12)]">
                <AppImage
                  src={member.imageUrl}
                  alt={`${member.name} - ${member.role}`}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(315deg,_rgba(174,85,33,0.1)_0%,_rgba(174,85,33,0)_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                {member.name}
              </h3>
              <p className="text-sm text-[var(--secondary)]" style={{ fontFamily: "var(--font-body)" }}>
                {member.role}
              </p>
              {member.bio && (
                <p className="text-xs text-[var(--secondary)] mt-2 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
