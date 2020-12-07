import { MDBContainer } from 'mdbreact'
import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/privacy.css'
import Footer from './Footer'
import Navbar from './Navbar'
import NavbarPublic from './NavbarPublic'

export default function Privacy() {
    const user = useSelector(state => state.user);
    return (
        <div>
            {user.loginInfo === null ? (
              <NavbarPublic />
            ) 
            : (
              <Navbar />
            )}
            {/* <div id="section1" className="background mb-5">
            <div className="layer">
            </div> */}
        {/* </div> */}
            <MDBContainer className="mt-5">
            <h1  className="faq-title">Privacy Policy <i class="fas fa-shield-alt"></i></h1>
            <h1 className="policy-title">fetchMate Privacy Statement</h1>
            <h2 className="policy-date">Effective date: December 08, 2020</h2><br />
                <p className="p">This Privacy Policy applies when you use our Services (described below). We offer our users choices about the data we collect, use and share as described in this Privacy Policy.</p><br/>

                <h2 className="h2">I. What kind of information do we collect?</h2>
                    <p className="p">To provide the fetchMate services, we must process information about you. The types of information we collect depend on how you use our services. You can learn how to access and delete information we collect by visiting the fetchMate.</p>

                <h3 className="h3">Things you and others do and provide.</h3>
                <h4 className="h4"><span className="span">Information and content you provide.</span> We collect the content, communications and other information you provide when you use our services, including when you sign up for an account, create or share content, and message or communicate with project owners. This can include information about the content you provide, such as the skills set on the project or the profile of the developer was created. It can also include what you see through features we provide, so we can do things like suggest the project matches with the ones the developer that you might like. Our systems automatically process content and communications you and others provide to analyze context and what's in them for the purposes described below.</h4>

                <h4 className="h4"><span className="span">Data with special protections:</span> You can choose to provide information in your fetchMate profile fields or who you are "interested in,". This and other information could be subject to special protections under the laws of your country.</h4>

                <h4 className="h4"><span className="span">Networks and connections.</span> We collect information about the people, chat content, accounts,  and groups you are connected to and how you interact with them across our services, such as people you communicate with the most or groups you are working on. We also collect contact information if you choose to create the profile, or the project description from your device, which we use for things like helping you and others find people you may know and for the other purposes listed below.</h4>

                <h4 className="h4"><span className="span">Your usage.</span> We collect information about how you use our services, such as the types of content you view or engage with; the features you use; the actions you take; the people or accounts you interact with; and the time, frequency and duration of your activities. For example, we log when you're using and have last used our services, and what posts,  and other content you view on our services.</h4>

                <h4 className="h4"><span className="span">Things others do and information they provide about you.</span> We also receive and analyze content, communications and information that other people provide when they use our services. This can include information about you, such as when others share or comment on a project details of you, send a message to you, or upload, sync or import your contact information.</h4>
                            
                <h4 className="h4"><span className="span">Device Information</span>As described below, we collect information from and about the computers, mobile devices,  and other web-connected devices you use that integrate with our services, and we combine this  information across different devices you use. For example, we use information collected about your use of our services on your phone to better personalize the content or features you  see when you use our services on another device, such as your laptop or tablet, or to measure whether you took an action in response to an ad we showed you on your computers on a different device.</h4>

                <h2 className="h2"> II. How do we use this information?</h2>
                <p>We use the information we have (subject to choices you make) as described below and to provide and support the fetchMate services and related services described in the fetchMate Terms. Here's how:</p>
                <h3 className="h3">Provide, personalize and improve our services.</h3>
                <p className="p">We use the information we have to deliver our services, including to personalize features such as what skills the developers are looking for in another developer.  How you use and interact with our services; and the people, places, or things you're connected to and interested in on and off our services. Learn more about how we use information about you to personalize your fetchMate experience, including features, content and recommendations in fetchMate services.</p>
                <h4 className="h4"><span className="span">Information across fetchMate services and devices:</span> We connect information about your activities on different fetchMate services and devices to provide a more tailored and consistent experience on all fetchMate services you use, wherever you use them. For example, we can suggest that you join a group on fetchMate that includes people you follow on fetchMate or communicate with using live chat. We can also make your experience more seamless, for example, by automatically filling in your registration information from one fetchMate Product when you sign up for an account on a different Product.</h4>
                <h4 className="h4"><span className="span">Product research and development:</span> We use the information we have to develop, test and improve our services, including by conducting surveys and research, and testing and troubleshooting new services and features.</h4>

                <h2 className="h2">III. How is this information shared?</h2>
                <h3 className="h3">Sharing on fetchMate</h3>
                <h4 className="h4"><span className="span">People and accounts you share and communicate with</span></h4>
                <p className="p">Public information can be seen by anyone, on or off our services, such as fetchMate Marketplace. You, other people using fetchMate, and we can provide access to or send public information to anyone on or off our services, including in  fetchMate Company services, in search results, or through tools. Public information can also be seen, accessed, reshared or downloaded through third-party services such as search engines, APIs, and by apps, websites and other services that integrate with our services.</p>

                <h4 className="h4"><span className="span">Content others share or reshare about you</span> <br/> You should consider who you choose to share with, because people who can see your activity on our services can choose to share it with others on and off our services, including people you shared with. For example, when you share a post or send a message to specific friends or accounts, they can screenshot, or reshare that content to others across or off our services, in person or in virtual reality experiences such as fetchMate Spaces.  Also, when you comment on someone else's post or react to their content, your comment or reaction is visible to anyone who can see the other person's content, and that person can change the audience later.</h4>
                <p className="p">People can also use our services to create content about you with the audience they choose. For example, people can share a project with a developer in detail, mention or tag you at a location in a post, or share information about you in their posts or messages. If you are uncomfortable with what others have shared about you on our services, you can learn how to report the content.</p>

                <h2 className="h2">IV. How do the fetchMate Developers work together?</h2>
                <p className="p">fetchMate shares the projects, communications and developer profile with other fetchMate Developers to provide the project matching, relevant, consistent and safe experience across all fetchMate Company services  you use. We also process information about you across the fetchMate Developers for these purposes, as permitted by applicable law and in accordance with their terms and policies. For example, we also work to understand how people use and interact with fetchMate Company services.</p>

                <h2 className="h2">V. How will we notify you of changes to this policy?</h2>
                <p className="p">We'll notify you before we make changes to this policy and give you the opportunity to review the revised policy before you choose to continue using our services.</p>

                <h4 className="last-statement">If you have questions or comments about this policy, you may contact us by email at fetchmate2020@gmail.com.</h4>
                </MDBContainer>
            <Footer />
        </div>
    )
}
