import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../style/signin.css"
import {
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signin-container">
      <div className="login-container">
        <h2 className="overlay-text">Đăng nhập</h2>
        <form>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Tên đăng nhập hoặc Email"
              required
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "22px",
                cursor: "pointer",
                color: "blue",
              }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "22px",
                cursor: "pointer",
                color: "blue",
              }}
            />
          </div>
          <div className="password-container">
            <div className="forgot-password">
              <a href="#">Quên mật khẩu?</a>
            </div>
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
        <div className="additional-links">
          <a href="#" className="signup-link">
            Bạn chưa có tài khoản? Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
