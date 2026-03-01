import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="w-full bg-background py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Trade Smarter. <br />
            <span className="text-primary">Grow Faster.</span>
          </h1>

          <p className="text-lg text-muted-foreground">
            Professional Index & F&O Advisory Services
          </p>

          <p className="text-muted-foreground">Nifty | Bank Nifty | Sensex</p>

          <p className="text-muted-foreground">
            Technical Based Research | Risk Managed Strategy
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg">View Subscription Plans</Button>

            <Button variant="outline" size="lg">
              Start Free Trial
            </Button>
          </div>
        </div>

        {/* Right Graphic Placeholder */}
        <div className="hidden md:flex justify-center">
          <div className="w-[400px] h-[400px] rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground">
            Candlestick Graphic Here
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
