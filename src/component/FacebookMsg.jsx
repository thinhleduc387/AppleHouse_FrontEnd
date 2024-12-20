import { FacebookProvider, CustomChat } from "react-facebook";

const FacebookMsg = () => {
  return (
    <FacebookProvider appId="986366426764639" chatSupport>
      <CustomChat pageId="525989390595028" minimized="true" />
    </FacebookProvider>
  );
};

export default FacebookMsg;
