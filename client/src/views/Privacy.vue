<template>
    <div id="privacy">
        <main>
            <div class="content">
                <h1>Privacy</h1>

                <h2>Dislaimer</h2>
                <p>I know how important privacy is. That's why on qrgen.cc
                <ul>
                    <li>I don't ask for personally-identifying information.</li>
                    <li>I don't share personal information with anyone except to comply with the law or protect my rights.</li>
                    <li>I don’t store personal information on my server unless required for the on-going operation of this service.</li>
                </ul>
                </p>
                <p>If you have any questions about privacy when using this service contact me at <a href="mailto:webmaster@mxis.ch">webmaster@mxis.ch</a>.</p>

                <h2>Legal Stuff</h2>

                <p>If you choose to use this Service, then you agree to the collection and use of information in relation with
                this policy. The Personal Information that we collect are used for providing and improving the Service. We will not
                use or share your information with anyone except as described in this Privacy Policy.</p>

                <h3>Log Data</h3>

                <p>When you visit this website, our servers may automatically log the standard data provided by your web browser.
                It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you
                visit, the time and date of your visit, the time spent on each page, and other details.</p>

                <h3>Legal bases for processing</h3>
                <p>We will process your personal information lawfully, fairly and in a transparent manner. We collect and process information about you only where we have legal bases for doing so.</p>
                <p>These legal bases depend on the services you use and how you use them, meaning we collect and use your information only where:</p>
                <ul>
                <li>it’s necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract (for example, when we provide a service you request from us);</li>
                <li>it satisfies a legitimate interest (which is not overridden by your data protection interests), such as for research and development, to market and promote our services, and to protect our legal rights and interests;</li>
                <li>you give us consent to do so for a specific purpose (for example, you might consent to us sending you our newsletter); or</li>
                <li>we need to process your data to comply with a legal obligation.</li>
                </ul>
                <p>Where you consent to our use of information about you for a specific purpose, you have the right to change your mind at any time (but this will not affect any processing that has already taken place).</p>
                <p>We don’t keep personal information for longer than is necessary. While we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification. That said, we advise that no method of electronic transmission or storage is 100% secure and cannot guarantee absolute data security. If necessary, we may retain your personal information for our compliance with a legal obligation or in order to protect your vital interests or the vital interests of another natural person.</p>

                <h3>Collection and use of information</h3>
                <p>We may collect, hold, use and disclose information for the following purposes and personal information will not be further processed in a manner that is incompatible with these purposes:</p>
                <ul>
                <li>for analytics, market research and business development, including to operate and improve our website, associated applications and associated social media platforms.</li>
                </ul>

                <h3>Cookies</h3>

                <p>This website uses these "cookies" to collection information and to improve our Service. You have the option to
                either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to
                refuse our cookies, you may not be able to use some portions of our Service.</p>

                <p>For more general information on cookies, please read <a
                    href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</a>.</p>

                <h3>Service Providers</h3>

                <p>We may employ third-party companies and individuals due to the following reasons:</p>

                <ul>
                <li>To facilitate our Service;</li>
                <li>To provide the Service on our behalf;</li>
                <li>To perform Service-related services; or</li>
                <li>To assist us in analyzing how our Service is used.</li>
                </ul>

                <h3>Security</h3>

                <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially
                acceptable means of protecting it. But remember that no method of transmission over the internet, or method of
                electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>

                <h3>Links to Other Sites</h3>

                <p>Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that
                site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the
                Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy
                policies, or practices of any third-party sites or services.</p>

                <h3>Changes to this policy</h3>

                <p>At our discretion, we may change our privacy policy to reflect current acceptable practices. We will take reasonable steps to let users know about changes via our website. Your continued use of this site after any changes to this policy will be regarded as acceptance of our practices around privacy and personal information. </p>
                <p>If we make a significant change to this privacy policy, for example changing a lawful basis on which we process your personal information, we will ask you to re-consent to the amended privacy policy.</p>
                <p>This policy is effective as of 04.05.2020</p>

                <h3>Contact Me</h3>

                <p>If you have any questions or suggestions about this Privacy Policy, contact me at <a
                    href="mailto:webmaster@mxis.ch">webmaster@mxis.ch</a>.</p>
            </div>
            <By />
        </main>
        <Footer />
    </div>
</template>

<script>
  import Footer from '@/components/Footer'
  import By from '@/components/By'

    export default {
        name: 'App',
        components: {
            Footer, By
        }
    }
</script>

<style lang="scss">
    #privacy .content {
        max-width: 800px;
        min-width: 300px;
        margin: auto;
        margin-top: 5rem;
        margin-bottom: 5rem;
        padding: 0px 40px;
        -webkit-animation: fadein 1s;
        -moz-animation: fadein 1s;
        -ms-animation: fadein 1s;
        -o-animation: fadein 1s;
        animation: fadein 1s;
    }
 a{
  text-decoration: none;
  color: #60ddaf;
  font-weight: 600;
}
h1{
  text-align: center;
}
</style>
