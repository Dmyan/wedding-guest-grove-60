import { AuthForm } from "@/components/auth/AuthForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-light">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Wedding Guest Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plan your perfect day with ease. Manage guests, RSVPs, and more in one beautiful place.
          </p>
        </div>

        <div className="flex justify-center">
          <AuthForm />
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Guest Management</h3>
            <p className="text-gray-600">Easily manage your guest list and track RSVPs in real-time.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Digital Invitations</h3>
            <p className="text-gray-600">Create and send beautiful digital invitations to your guests.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Event Details</h3>
            <p className="text-gray-600">Keep your guests informed with all the important details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;