import React from "react";
import { Box } from "@cloudflare/component-box";
import {
  Header,
  NavList,
  NavItem,
  Hamburger
} from "@cloudflare/component-header";
import { LogoHeader } from "@cloudflare/component-logo";
import { Page, PageHeader, PageContent } from "@cloudflare/component-page";
import remark from "remark";
import remark2react from "remark-react";

export default class MarkdownPage extends React.Component {
  render() {
    return (
      <div className="App-header">
        <Header>
          <Box display="flex">
            <Hamburger onClick={() => console.log("Yum! Hamburger")} />
            <a href=".">
              <LogoHeader />
            </a>
          </Box>
          <NavList>
            <NavItem>One</NavItem>
            <NavItem>Two</NavItem>
            <NavItem>Three</NavItem>
          </NavList>
        </Header>

        <Page>
          <PageContent>
            <PageHeader title="Title" subtitle="Subtitle" beta />
            <div style={{ paddingTop: "2rem", display: "flex" }}>
              <div style={{ borderRight: "1px solid rgb(234, 235, 235)" }}>
                <Box>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0
                    }}
                  >
                    <li
                      style={{
                        marginLeft: 0,
                        marginBottom: 8,
                        fontSize: 16,
                        width: 150,
                        fontWeight: true ? 500 : 300
                      }}
                    >
                      <a href={"/"}>
                        <span
                          style={
                            true
                              ? {
                                  backgroundAttachment: "scroll",
                                  backgroundClip: "border-box",
                                  backgroundColor: "rgb(224, 109, 16)",
                                  backgroundImage: "none",
                                  backgroundOrigin: "padding-box",
                                  backgroundPositionX: "0%",
                                  position: "relative",
                                  bottom: 0,
                                  float: "right",
                                  boxSizing: "border-box",
                                  color: "rgb(0, 0, 0)",
                                  cursor: "pointer",
                                  display: "block",
                                  fontStretch: "100%",
                                  fontStyle: "normal",
                                  fontVariantCaps: "normal",
                                  height: 24,
                                  lineHeight: 24,
                                  right: 0,
                                  textSizeAdjust: "100%",
                                  top: 0,
                                  width: 4,
                                  webkitBoxDirection: "normal"
                                }
                              : {}
                          }
                        />
                        tab tab hello!
                      </a>
                    </li>
                  </ul>
                </Box>
              </div>
              <div className="content" style={{ paddingLeft: "2rem" }}>
                {
                  remark()
                    .use(remark2react)
                    .processSync(this.props.input).contents
                }
              </div>
            </div>
          </PageContent>
        </Page>
      </div>
    );
  }
}
