import arkaPlan from "../images/kaydolGiris.jpg";
import { FaCircleUser } from "react-icons/fa6";
import { FaUnlock } from "react-icons/fa";
import { useFormik } from "formik";
import { registerPageSchema } from "../shemas/RegisterPageShema";
import { axiosLogin } from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/appSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoading = (value: boolean) => {
    dispatch(setLoading(value));
  };
  const login = async () => {
    handleLoading(true);

    const payload = {
      username: username,
      password: password,
      balance: 1000,
    };
    const response = await axiosLogin(payload);
    handleLoading(false);
    if (response) {
      toast.success("Başarıyla giriş yapıldı");
      dispatch(setCurrentUser(payload));
      navigate("/home");
    } else {
      toast.error("Hatalı Giriş!");
    }
  };
  const { values, errors, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: login,

    validationSchema: registerPageSchema,
  });
  const clear = () => {
    resetForm();
  };
  const { username, password } = values;
  return (
    <div
      style={{
        backgroundImage: `url(${arkaPlan})`,
        backgroundSize: "cover",
      }}
      className="w-full min-h-screen flex justify-center items-center"
    >
      <div className="w-[30rem] pt-10 pr-10 pl-10 pb-7  shadow-xl border-t-2 border-gray-600 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 justify-center items-center"
        >
          <div className="relative">
            <input
              type="text"
              className=" py-[7px] px-12 w-[27rem] border-b-2 border-gray-700 rounded-md outline-none "
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={handleChange}
              id="username"
            />

            <FaCircleUser className="absolute bottom-[10px] left-3  text-[1.2rem]" />
          </div>
          <p className="w-full text-left text-sm italic text-red-600 font-bold">
            {errors.username && errors.username}
          </p>
          <div className="relative">
            <input
              type="password"
              className="py-[7px] px-12   border-b-2 border-gray-700 rounded-md outline-none w-[27rem]"
              placeholder="Şifre"
              value={password}
              onChange={handleChange}
              id="password"
            />
            <FaUnlock className="absolute bottom-[10px] left-3 text-[1.2rem]" />
          </div>
          <p className="w-full text-left text-sm italic text-red-600 font-bold">
            {errors.password && errors.password}
          </p>

          <div className="flex justify-between w-[26rem] px-1 mt-2 text-white">
            <button
              type="submit"
              className="w-[12rem] bg-green-800 p-2 rounded-lg"
            >
              Giriş Yap
            </button>
            <button
              onClick={clear}
              className="w-[12rem] bg-gray-500 p-2 rounded-lg"
            >
              Temizle
            </button>
          </div>
          <a
            onClick={() => navigate("/")}
            className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition-colors duration-200 cursor-pointer mt-2"
          >
            Hesabın yok mu? Hesap oluşturmak için tıkla
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
