import styles from './Footer.module.css';

export default function Footer() {
  return (
    <>
    <div className={styles.footer}>
            <div className={styles.wrapFooter}>
                <div className="subFooter">
                    <div>
                        <div>Contact us</div>
                    </div>
                    <div>
                        <div>Further Information</div>
                        <div className={styles.detailFoot}>
                            <div>Terms Conditions</div>
                            <div>Privacy Policy</div>
                        </div>
                    </div>
                    <div>
                        <div>Address</div>
                        <div className={styles.detailFoot}>
                            <div>Jl H Saaba no 13 Jakarta Barat DKI Jakarta 15141</div>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <div> ©  Designed by Andhika P P </div>
                </div>
            </div>
        </div>
        </>
  )
}
