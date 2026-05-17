import SignupDesktop from "@/components/signup/SignupDesktop";
import SignupMobile from "@/components/signup/SignupMobile";

export default function SignupPage() {
  return (
    <>
      <div className="md:hidden">
        <SignupMobile />
      </div>
      <div className="hidden md:block">
        <SignupDesktop />
      </div>
    </>
  );
}
