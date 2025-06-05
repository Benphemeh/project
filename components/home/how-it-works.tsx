import { ShoppingCart, Truck, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <ShoppingCart className="h-12 w-12 text-primary" />,
      title: "Browse & Select",
      description:
        "Browse our extensive catalog of live pigs, fresh pork, foodstuff, drinks and more. Filter by size, breed, or type.",
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
      title: "Place Your Order",
      description:
        "Complete your purchase through our secure checkout process. Choose delivery or pickup options.",
    },
    {
      icon: <Truck className="h-12 w-12 text-primary" />,
      title: "Fast Delivery",
      description:
        "Receive your order right at your doorstep. We ensure timely delivery with our specialized transportation.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We've simplified the process of getting farm-fresh products delivered to your doorstep. Here's how it works:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-8 text-center h-full flex flex-col items-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-6 rounded-full bg-primary/10 p-4 inline-flex">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                {index < steps.length - 1 && (
                  <div className="w-6 h-6 rounded-full border-2 border-dashed border-primary"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}