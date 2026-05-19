import LoginDesktop from "@/components/login/LoginDesktop";
import LoginMobile from "@/components/login/LoginMobile";

export default function LoginPage() {
  return (
    <>
      <div className="md:hidden">
        <LoginMobile />
      </div>
      <div className="hidden md:block">
        <LoginDesktop />
      </div>
    </>
  );
}
