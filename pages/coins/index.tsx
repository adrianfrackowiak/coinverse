import router from "next/router";
import { useEffect } from "react";

const CoinsPage = () => {
  useEffect(() => {
    router.push("/");
  }, []);

  return <></>;
};

export default CoinsPage;
