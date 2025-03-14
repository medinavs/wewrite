import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../../http/auth-sign-in";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/ui/Toast";

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

export function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const signInResult = await signIn({
        email: data.email,
        password: data.password,
      });

      if (signInResult.success) {
        console.log("User signed in:", signInResult.user);
        localStorage.setItem("wewrite-token", signInResult.token);
        navigate("/");
      } else {
        showToast({
          message: signInResult.error ?? "An unexpected error occurred",
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  console.log(errors);

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div
          className="card-header text-white text-center py-3"
          style={{ background: "black" }}
        >
          <h4>Login | WeWrite</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit(onSubmit)} id="login-form">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Digite sua senha"
                {...register("password")}
              />
            </div>
            <button
              type="submit"
              form="login-form"
              className="btn btn-primary w-100 mt-3"
              style={{
                background: "black",
                border: "none",
              }}
            >
              Entrar
            </button>
          </form>
        </div>
        <div className="card-footer text-center py-3">
          <p className="mb-0">
            Não tem uma conta?{" "}
            <a href="/register" className="text-decoration-none">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
