import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative z-10 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Benvenuto in FrameFlow
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0 animate-slide-up">
                La piattaforma intelligente per la gestione di serramenti
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl glass-effect">
                <h2 className="text-xl font-semibold mb-4">Per i Fornitori</h2>
                <p className="text-muted-foreground mb-4">
                  Gestisci il tuo catalogo prodotti e monitora gli ordini in tempo reale
                </p>
              </div>

              <div className="p-6 rounded-xl glass-effect">
                <h2 className="text-xl font-semibold mb-4">Per gli Installatori</h2>
                <p className="text-muted-foreground mb-4">
                  Crea preventivi professionali e gestisci i tuoi progetti con facilità
                </p>
              </div>

              <div className="p-6 rounded-xl glass-effect">
                <h2 className="text-xl font-semibold mb-4">Per i Clienti</h2>
                <p className="text-muted-foreground mb-4">
                  Visualizza e approva i preventivi, segui lo stato dei tuoi ordini
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Caratteristiche Principali
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
                <h3 className="font-medium text-lg mb-2">Calcoli Automatici</h3>
                <p className="text-sm text-muted-foreground">
                  Calcoli dimensionali precisi e automatizzati
                </p>
              </div>
              
              <div className="p-6 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
                <h3 className="font-medium text-lg mb-2">Gestione Ordini</h3>
                <p className="text-sm text-muted-foreground">
                  Tracciamento completo dello stato degli ordini
                </p>
              </div>
              
              <div className="p-6 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
                <h3 className="font-medium text-lg mb-2">Preventivi Smart</h3>
                <p className="text-sm text-muted-foreground">
                  Creazione rapida di preventivi professionali
                </p>
              </div>
              
              <div className="p-6 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
                <h3 className="font-medium text-lg mb-2">Catalogo Digitale</h3>
                <p className="text-sm text-muted-foreground">
                  Gestione completa del catalogo prodotti
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
