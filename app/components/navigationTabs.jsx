import { Tabs } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "@remix-run/react"

const navStructure = [
  {
    label: "Dashboard",
    destination: "/app",
  },
  {
    label: "Pricing",
    destination: "/app/pricing",
  },
  {
    label: "Branding",
    destination: "/app/branding",
  },
  {
    label: "Free gifts",
    destination: "/app/free-gifts",
  },
  {
    label: "How to use",
    destination: "/app/how-to-use",
  }
];


const IDENTIFIER_PREFIX = 'checkout_app_';

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function NavigationTabs () {

  const navigate = useNavigate()
  let selectedIndex = 0;
  const location = useLocation();
  useEffect(() => {
      navStructure.forEach((tab, index) => {
          if (location.pathname.includes(`${tab.destination}`)) {
              setSelected(index);
          }
      })
  }, [location]);

  const [selected, setSelected] = useState(selectedIndex);

  const handleTabChange = useCallback(
    (selectedTabIndex) => {
      setSelected(selectedTabIndex);
      navigate(`${navStructure[selectedTabIndex].destination}`)
    },
    [],
  );

  const generateTabsData = (tabs) => {
    let tempTabs = [];
    tabs.forEach(element => {
      tempTabs.push(
        {
          id: `${IDENTIFIER_PREFIX} ${element.label}`,
          content: capitalize(element.label),
          accessibilityLabel: `Main ${capitalize(element.label)}`,
          panelID: IDENTIFIER_PREFIX + `${element.label}-content`,
        })
    });
    return tempTabs;
  }

  return (
    <>
      <ui-nav-menu>
        {navStructure.map((nav, index) =>
          <Link to={nav.destination} {...{ rel: (index == 0 ? 'home' : '') }}>{capitalize(nav.label)} </Link>)
        }
      </ui-nav-menu>
      <Tabs
        tabs={generateTabsData(navStructure)}
        selected={selected}
        onSelect={handleTabChange}
        disclosureText="More views">
      </Tabs>
    </>
  );
}
