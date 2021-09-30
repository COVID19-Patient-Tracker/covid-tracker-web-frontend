import React from 'react';

import styles from '../../../App.module.css';
import { HeaderContentHospitalUser } from '../../../components/HeaderContent';

export default function HospitalAdminDash() {

    return (
        <React.Fragment>
            <HeaderContentHospitalUser />
            <div>
                <img src="/assets/userback2.svg" alt='' style={{ backgroundSize: 'cover', width: "100%", backgroundRepeat: 'no-repeat' }} />
            </div>
            <div className={styles.user_container}>

            </div>
            <br /><br /><br /><br /><br />
        </React.Fragment>
    );
}

