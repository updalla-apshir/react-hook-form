import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userRegistration = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .nonempty("email is required")
    .email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  bio: z
    .string()
    .max(8, "Bio must not exceed 8 characters")
    .nonempty("Bio must be at least 8 characters"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  favoriteFood: z
    .array(z.string())
    .nonempty("Please select at least one favorite food.")
    .max(3, "Please select at least three favorite food maximum"),

  country: z.string().nonempty("Please select a country"),
  profilePicture: z.custom<FileList>((files) => files && files.length > 0, {
    message: "Profile picture is required",
  }),
});

type TuserRegisration = z.infer<typeof userRegistration>;

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TuserRegisration>({
    resolver: zodResolver(userRegistration),
    defaultValues: {
      favoriteFood: [], // Ensure the field starts as an empty array
    },
  });

  const onSubmit = async (data: TuserRegisration) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Form Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          User Registration
        </h1>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="relative mt-1">
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Enter your name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <i className="fas fa-user"></i>
            </span>
          </div>
          {errors.name && (
            <p className="text-red-500">{`${errors.name.message}`}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative mt-1">
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <i className="fas fa-lock"></i>
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            {...register("bio")}
            id="bio"
            placeholder="Write a short bio"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.bio && (
            <p className="text-red-500">{`${errors.bio.message}`}</p>
          )}
        </div>

        {/* Gender */}
        <fieldset>
          <legend className="text-sm font-medium text-gray-700">Gender</legend>
          <div className="mt-2 flex space-x-4">
            <div className="flex items-center">
              <input
                {...register("gender")}
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="male" className="ml-2 text-sm text-gray-700">
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                {...register("gender")}
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="female" className="ml-2 text-sm text-gray-700">
                Female
              </label>
            </div>
          </div>
          {errors.gender && (
            <p className="text-red-500">{`${errors.gender.message}`}</p>
          )}
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-gray-700">
            Your Favorite Food
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {["Pizza", "Burger", "Sushi", "Pasta", "Salad", "Ice Cream"].map(
              (food) => (
                <div key={food} className="flex items-center">
                  <input
                    {...register("favoriteFood")}
                    type="checkbox"
                    id={food.toLowerCase()}
                    value={food}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={food.toLowerCase()}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {food}
                  </label>
                </div>
              )
            )}
          </div>
          {errors.favoriteFood && (
            <p className="text-red-500">{errors.favoriteFood.message}</p>
          )}
        </fieldset>

        {/* Country */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            {...register("country")}
            id="country"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
          </select>
          {errors.country && (
            <p className="text-red-500">{`${errors.country.message}`}</p>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <input
            {...register("profilePicture")}
            type="file"
            id="profilePicture"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
          />
          {errors.profilePicture && (
            <p className="text-red-500">{`${errors.profilePicture.message}`}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full inline-flex justify-center rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
