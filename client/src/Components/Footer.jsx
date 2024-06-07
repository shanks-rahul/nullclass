import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter} from 'react-icons/bs'

function Footer() {

    const date=new Date();
    const year=date.getFullYear();

    return (
        <footer className="relative left-0 bottom-0 right-0 w-[100vw] h-[10vh] px-10 bg-gray-800 flex flex-col sm:flex-row py-4 items-center justify-between">
            <section className="text-lg">
                Copyright {year} | All Rights Reserved
            </section>
            <section className="flex items-center justify-center text-white text-2xl ">
                <a className="hover:text-yellow-500 transition-all ease-in-out duration-300 px-3">
                    <BsInstagram />
                </a>
                <a className="hover:text-yellow-500 transition-all ease-in-out duration-300 px-3">
                    <BsFacebook />
                </a>
                <a className="hover:text-yellow-500 transition-all ease-in-out duration-300 px-3">
                    <BsTwitter />
                </a>
                <a className="hover:text-yellow-500 transition-all ease-in-out duration-300 px-3">
                    <BsLinkedin />
                </a>
            </section>
        </footer>
    )
}

export default Footer;