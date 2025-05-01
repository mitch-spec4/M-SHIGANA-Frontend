
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-7xl font-bold ember-gradient bg-clip-text text-transparent">404</div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button className="ember-gradient">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
