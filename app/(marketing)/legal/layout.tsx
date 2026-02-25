
export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#02040a] min-h-screen pt-48 pb-48">
            <div className="container mx-auto px-6 md:px-10 max-w-4xl">
                <div className="prose prose-invert prose-headings:font-poppins prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black prose-p:text-muted-foreground prose-p:italic prose-p:uppercase prose-p:tracking-widest prose-p:text-xs">
                    {children}
                </div>
            </div>
        </div>
    );
}
