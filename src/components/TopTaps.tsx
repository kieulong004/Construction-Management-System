import { useTranslation } from "react-i18next";

const TopTabs = () => {
    const {t} = useTranslation('dashboard');
    return (
        <div className="top-tabs">
            <div className="tab-card">
                <div className="tab-number">1000</div>
                <p>{t('top-tabs.worker')}</p>
            </div>
            <div className="tab-card">
                <div className="tab-number">10</div>
                <p>{t('top-tabs.contractor')}</p>
            </div>
            <div className="tab-card">
                <div className="tab-number" style={{ color: '#52a32e' }}>5000</div>
                <p>{t('top-tabs.safe_labor_hours')}</p>
            </div>
            <div className="tab-card">
                <div className="tab-number">1</div>
                <p>{t('top-tabs.discover_violations')}</p>
            </div>
            <div className="tab-card">
                <div className="tab-number">500</div>
                <p>{t('top-tabs.workers_at_the_site')}</p>
            </div>
            <div className="tab-card">
                <div className="tab-number">100</div>
                <p>{t('top-tabs.daily_work')}</p>
            </div>
        </div>
    );
};

export default TopTabs;