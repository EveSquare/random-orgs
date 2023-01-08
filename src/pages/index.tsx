import { Box, Button, Text } from "@chakra-ui/react";
import Container from 'components/Container'
import DarkModeSwitch from 'components/DarkModeSwitch'
import OrganizationCard from "components/OrganizationCard";
import { Organization } from "components/OrganizationCard/type";
import Head from "next/head";
import { useEffect, useState } from "react";

const Index = () => {

  const LIMIT = 10;
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonState, setButtonState] = useState({
    prev: true,
    next: false,
  });

  async function getOrgs() {
    const result = await fetch('api/getRandomOrgs')
      .then(response => response.json());
    return result;
  }

  async function OnClickNext() {
    const isLimit = LIMIT === orgs.length - 1;
    const isLast = currentIndex === orgs.length - 1;

    if (isLimit && isLast) {
      setButtonState({
        ...buttonState,
        next: true,
      });
      return;
    }

    if (isLast) {
      const newOrgs = [...orgs];
      newOrgs.push(await getOrgs());
      setOrgs(newOrgs);
    }

    setCurrentIndex(currentIndex + 1);
    orgs.length > 1 && setButtonState({
      ...buttonState,
      prev: false,
    });
  }

  function OnClickPrev() {
    const isFirst = currentIndex === 0;
    if (isFirst) {
      setButtonState({
        ...buttonState,
        prev: true,
      });
      return;
    }
    setCurrentIndex(currentIndex - 1);
    orgs.length > 1 && setButtonState({
      ...buttonState,
      next: false,
    });
  }

  useEffect(() => {
    async function fetchOrgs() {
      const newOrgs = await getOrgs();
      setOrgs([newOrgs]);
    }
    fetchOrgs();
  }, []);

  return (
    <>
      <Head>
        <title>Random pick organization</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Container height="100vh">
        <DarkModeSwitch />

        <Box display="flex" justifyContent="center" p="8%">
          <Text as="b" fontSize='5xl'>Github random pick organization</Text>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" w={"60%"}>
          <Box display="flex" flexDirection="column" minWidth={"100%"}>
            {orgs[currentIndex] ?
              <OrganizationCard
                organization={orgs[currentIndex]}
              />
              :
              <></>
            }
            <Box display="flex" justifyContent="center" m="3rem">
              <Button
                disabled={buttonState.prev}
                onClick={OnClickPrev}
                p="2rem"
                m="2rem"
                size='lg'
                variant='outline'
              >Prev</Button>
              <Button
                disabled={buttonState.next}
                onClick={OnClickNext}
                p="2rem"
                m="2rem"
                colorScheme='teal'
                size='lg'
              >{orgs.length == LIMIT ? "LIMIT" : "Feel the destiny"}</Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
};

export default Index
