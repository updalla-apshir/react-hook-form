import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignupSchema = z
  .object({
    email: z.string().email(),
    Password: z.string().min(10, "password must be at least 10 characters"),
    ConfirmPassword: z.string(),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

type TsignupSchema = z.infer<typeof SignupSchema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TsignupSchema>({
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit = async (data: TsignupSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 w-[30rem] text-left"
      >
        <input
          {...register("email")}
          type="email"
          placeholder="email"
          className="px-4 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <input
          {...register("Password")}
          type="password"
          placeholder="password"
          className="px-4 py-2 rounded"
        />
        {errors.Password && (
          <p className="text-red-500">{`${errors.Password.message}`}</p>
        )}

        <input
          {...register("ConfirmPassword")}
          type="password"
          placeholder="confirm password"
          className="px-4 py-2 rounded"
        />
        {errors.ConfirmPassword && (
          <p className="text-red-500">{`${errors.ConfirmPassword.message}`}</p>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
