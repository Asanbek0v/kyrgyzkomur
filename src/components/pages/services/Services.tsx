"use client";
import { FC } from "react";
import "./Services.scss";
import logo from "@/src/assets/headerlogo.png";
import Image from "next/image";
import { Lock, User, Eye, EyeOff, LogIn } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface IServices {
  login: string;
  password: string;
  rememberMe: boolean;
}

const Services: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IServices>({
    defaultValues: {
      login: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<IServices> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <section id="Services">
      <div className="container">
        <div className="Services">
          <div
            className="Services--block"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            <div
              className="Services--block__head"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="150"
            >
              <Image src={logo} alt="logo" width={60} height={60} />
              <h1>Личный кабинет</h1>
              <span>Вход в систему управления</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div
                className="Services--block__group"
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="250"
              >
                <span>Логин</span>
                <div className="Services--block__input">
                  <User className="icon" size={18} />
                  <input
                    type="text"
                    placeholder="gmail...."
                    {...register("login", {
                      required: "Введите логин",
                    })}
                  />
                </div>
                {errors.login && (
                  <p className="Services--block__error">
                    {errors.login.message}
                  </p>
                )}
              </div>

              <div
                className="Services--block__group"
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="350"
              >
                <span>Пароль</span>
                <div className="Services--block__input">
                  <Lock className="icon" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль...."
                    {...register("password", {
                      required: "Введите пароль",
                      minLength: {
                        value: 6,
                        message: "Минимум 6 символов",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="Services--block__toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="Services--block__error">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div
                className="Services--block__actions"
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="450"
              >
                <label className="Services--block__checkbox">
                  <input type="checkbox" {...register("rememberMe")} />
                  <span>Запомнить меня</span>
                </label>
              </div>

              <button
                type="submit"
                className="Services--block__submit"
                disabled={isSubmitting}
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="550"
              >
                <span>{isSubmitting ? "Вход..." : "Войти"}</span>
                <LogIn size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
