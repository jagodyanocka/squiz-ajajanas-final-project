/* eslint-disable @next/next/no-head-element */

import Navbar from "./navbar";
import Footer from "./footer";
import "../styles/layout.css"


export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <Navbar/>
        <main className="">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
