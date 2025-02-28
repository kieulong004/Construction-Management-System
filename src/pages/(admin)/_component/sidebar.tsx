import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next"  
import useTheme from "../../../hooks/useTheme";

const SideBar = () => {
  const { t,i18n } = useTranslation(['dashboard']);
 const { darkMode } = useTheme();
  return (
    <header>
      <div className="bars">
      <FontAwesomeIcon icon={faBars} />
      </div>
      <section className="header">
      <span>
        {t('header.construction_Monitoring_Dashboard')}
      </span>
      <div className="language-switcher" style={{ display: 'flex', justifyContent: "flex-end", margin: '1rem' }}>
        <select onChange={(e) => i18n.changeLanguage(e.target.value)} style={{ background:darkMode?"#000":"#fff ",color:darkMode?"#fff":"#000",padding: '5px', borderRadius: '5px', border: '1px solid #ced4da' }}>
        <option value="vi" >Tiếng Việt</option>
        <option value="en" >English</option>
        </select>
      </div>
      </section>
      
    </header>
  );
};

export default SideBar;
