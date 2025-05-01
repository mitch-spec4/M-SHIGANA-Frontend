
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Send, Shield, Clock, CreditCard, Check } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header/Navigation */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold ember-gradient bg-clip-text text-transparent">M-SHIGANA</h1>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="ember-gradient text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Fast, Secure <span className="ember-gradient bg-clip-text text-transparent">Money Transfers</span> Made Simple
            </h2>
            <p className="text-lg text-muted-foreground">
              Send money to friends and family around the world with low fees, competitive exchange rates, and a seamless experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="ember-gradient text-white">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-ember-primary/20 rounded-full blur-3xl" />
            <div className="bg-card rounded-xl shadow-xl overflow-hidden border p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Quick Transfer</h3>
                  <Send className="h-5 w-5 text-ember-primary" />
                </div>
                <div className="space-y-4">
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Sending</p>
                    <p className="text-xl font-semibold">$250.00 USD</p>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Recipient gets</p>
                    <p className="text-xl font-semibold">€230.75 EUR</p>
                    <p className="text-xs text-muted-foreground mt-1">Fee: $2.50 • Rate: 1 USD = 0.93 EUR</p>
                  </div>
                  <Button className="w-full ember-gradient text-white">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose M-SHIGANA</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to make money transfers easy, affordable and secure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-xl border">
              <div className="h-12 w-12 rounded-full bg-ember-primary/20 flex items-center justify-center mb-4">
                <Send className="h-6 w-6 text-ember-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Transfers</h3>
              <p className="text-muted-foreground">
                Send money that arrives in minutes, not days. Our transfers are processed quickly.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border">
              <div className="h-12 w-12 rounded-full bg-ember-primary/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-ember-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bank-Level Security</h3>
              <p className="text-muted-foreground">
                Your money and data are protected with industry-leading encryption and security practices.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border">
              <div className="h-12 w-12 rounded-full bg-ember-primary/20 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-ember-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Low Fees</h3>
              <p className="text-muted-foreground">
                Enjoy competitive rates and transparent pricing with no hidden charges.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border">
              <div className="h-12 w-12 rounded-full bg-ember-primary/20 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-ember-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Transfers</h3>
              <p className="text-muted-foreground">
                Send money anytime, day or night. Our platform never sleeps.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-ember-primary to-ember-secondary rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to start sending money?</h2>
              <p className="text-lg opacity-90 mb-8">
                Join thousands of users who trust M-SHIGANA for their money transfer needs. Sign up in minutes and send your first transfer today.
              </p>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-white text-ember-secondary hover:bg-gray-100">
                  Create Your Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-xl font-bold ember-gradient bg-clip-text text-transparent mb-4">M-SHIGANA</h2>
            <p className="text-muted-foreground mb-6">Fast, secure money transfers worldwide</p>
            <div className="flex justify-center space-x-6 mb-8">
              <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
              <Link to="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} M-SHIGANA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
