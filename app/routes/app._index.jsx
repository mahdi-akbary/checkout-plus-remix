import { useEffect, useState } from "react";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  VerticalStack,
  Card,
  Button,
  HorizontalStack,
  Box,
  Divider,
  List,
  Link,
  Modal,
  Spinner,
  CalloutCard,
  HorizontalGrid,
} from "@shopify/polaris";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  return json({ shop: session.shop.replace(".myshopify.com", "") });
};

export async function action ({ request }) {
  const { admin } = await authenticate.admin(request);

  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }],
        },
      },
    }
  );

  const responseJson = await response.json();

  return json({
    product: responseJson.data.productCreate.product,
  });
}

export default function Index () {
  const nav = useNavigation();
  const { shop } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();

  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

  const productId = actionData?.product?.id.replace(
    "gid://shopify/Product/",
    ""
  );

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId]);

  const generateProduct = () => submit({}, { replace: true, method: "POST" });

  const [displayVideoGuide, setDisplayVideoGuide] = useState(false);
  const navigate = useNavigate()

  const handleVideoGuideClick = () => {
    setDisplayVideoGuide(!displayVideoGuide);
  };

  return (
    <Page fullWidth>
      <ui-title-bar title="Dashboard" />
      <Layout>
        <Modal
          large
          open={displayVideoGuide}
          onClose={handleVideoGuideClick}
          title="An Overview"
          secondaryActions={[
            {
              content: "Learn more",
              onAction: () => {
                navigate('how-to-use')
                handleVideoGuideClick()
              }
            },
          ]}
        >
          <Modal.Section>
            <Box
              position="relative"
              width="100%"
              minHeight={`500px`}
            >
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  zIndex: 1,
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <Spinner size="large" />
              </div>
              <iframe
                src="https://www.loom.com/embed/9cb4a7db8f9f49bb83c9d51340ae4a73?sid=28aa6657-f859-48e3-b429-b7424eae1eae?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
                frameBorder="0"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "500px",
                  zIndex: 2,
                  position: "relative",
                }}
              ></iframe>
            </Box>
          </Modal.Section>
        </Modal>

        <Layout.Section>
          <CalloutCard
            title="Customize the checkout on Customiser"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: "Customize checkout",
              onAction: () =>
                // redirect.dispatch(
                //   Redirect.Action.ADMIN_PATH,
                //   "/settings/checkout/editor"
                // ),
                navigate('/settings/checkout/editor', {replace: true, relative: "path"} )
            }}
            secondaryAction={{
              content: "Video guide",
              onAction: handleVideoGuideClick,
            }}
          >
            <Text>
              Customize the checkout experience for your customers. Add AI
              product recommendations, upsells, cross-sells, trust badges, and
              more.
            </Text>
          </CalloutCard>
        </Layout.Section>
        <Layout.Section>
          <VerticalStack gap={"1"}>
            <Text variant="headingLg" as="h2">
              Dashboard & Analytics
            </Text>
            <Text as="span" color="subdued">
              Here’s what’s happening with your store in the past 7 days.
            </Text>
            <Divider borderWidth="0" />
          </VerticalStack>
        </Layout.Section>
        <Layout.Section>
          <VerticalStack gap={{ xs: "8", sm: "4" }}>
            <HorizontalGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="4">
              <Box
                as="section"
                paddingInlineStart={{ xs: 4, sm: 0 }}
                paddingInlineEnd={{ xs: 4, sm: 0 }}
              >
                <VerticalStack gap="4">
                  <Text as="h3" variant="headingMd">
                    AI Product Recommendations
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Use AI to recommend products to your customers. View
                    analytics to see how your recommendations are performing.
                  </Text>
                </VerticalStack>
              </Box>
              {/* <CountChart /> */}
              <Box></Box>
              {/* <AddedProductList /> */}
            </HorizontalGrid>
            <Box padding="4"></Box>
          </VerticalStack>
        </Layout.Section>

        <Layout.Section>
          <VerticalStack gap={{ xs: "8", sm: "4" }}>
            <HorizontalGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="4">
              <Box
                as="section"
                paddingInlineStart={{ xs: 4, sm: 0 }}
                paddingInlineEnd={{ xs: 4, sm: 0 }}
              >
                <VerticalStack gap="4">
                  <Text as="h3" variant="headingMd">
                    Survey & Feedbacks
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Here you can have customer's responses at a glance.
                  </Text>
                </VerticalStack>
              </Box>
              {/* <SurveyCountChart /> */}
              <Box></Box>
              {/* <FeedbackCountChart /> */}
            </HorizontalGrid>
            <Box padding="4"></Box>
          </VerticalStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
