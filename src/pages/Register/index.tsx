import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signUp } from "../../http/auth-sign-up";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/ui/Toast";

const avatarOptions = [
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Jocelyn",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Christian",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Destiny",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Ryker",
];

const RegisterFormSchema = z.object({
  name: z.string().min(3),
  avatar: z.string().url(),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterForm = z.infer<typeof RegisterFormSchema>;

export function Register() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      avatar: avatarOptions[0],
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const signUpResult = await signUp({
        id: "",
        email: data.email,
        password: data.password,
        avatar: data.avatar,
        name: data.name,
      });

      if (signUpResult.success) {
        console.log("User signed up successfully");
        showToast({
          message: "Cadastro realizado com sucesso!",
          type: "success",
          position: "bottom-right",
          autoClose: 2000,
        });
        navigate("/login");
      } else {
        showToast({
          message: signUpResult.error ?? "An unexpected error occurred",
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    setValue("avatar", avatarUrl);
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div
          className="card-header text-white text-center py-3"
          style={{ background: "black" }}
        >
          <h4>Cadastro | WeWrite</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit(onSubmit)} id="login-form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                className="form-control"
                id="email"
                placeholder="Digite seu nome"
                {...register("name")}
              />
              {errors.name && (
                <div className="text-danger small mt-1">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Avatar</label>
              <div className="d-flex justify-content-between flex-wrap gap-2">
                {avatarOptions.map((avatar, index) => (
                  <div
                    key={index}
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`avatar-option position-relative ${
                      selectedAvatar === avatar ? "selected" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar option ${index + 1}`}
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        border:
                          selectedAvatar === avatar
                            ? "3px solid black"
                            : "3px solid transparent",
                        padding: "3px",
                      }}
                    />
                    {selectedAvatar === avatar && (
                      <div
                        className="position-absolute"
                        style={{
                          bottom: "0",
                          right: "0",
                          background: "black",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "12px",
                        }}
                      >
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <input type="hidden" {...register("avatar")} />
              {errors.avatar && (
                <div className="text-danger small mt-1">
                  {errors.avatar.message}
                </div>
              )}
            </div>
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
              {errors.email && (
                <div className="text-danger small mt-1">
                  {errors.email.message}
                </div>
              )}
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
              {errors.password && (
                <div className="text-danger small mt-1">
                  {errors.password.message}
                </div>
              )}
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
              Criar
            </button>
          </form>
        </div>
        <div className="card-footer text-center py-3">
          <p className="mb-0">
            Já tem uma conta?{" "}
            <a
              href="/login"
              className="text-decoration-none"
              style={{ color: "#8e44ad" }}
            >
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
