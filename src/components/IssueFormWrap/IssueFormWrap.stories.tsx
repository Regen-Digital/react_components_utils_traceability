import type { Meta, StoryObj } from "@storybook/react";
import IssueFormWrap from "./IssueFormWrap";
import { BrowserRouter } from "react-router-dom";
import { VerifiableCredential } from "@vckit/core-types";

const meta: any = {
  title: "Issue Form Wrap Content",
  component: IssueFormWrap,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof IssueFormWrap>;

export default meta;
type Story = StoryObj<typeof meta>;

const vc: VerifiableCredential = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  type: ["VerifiableCredential"],
  issuer: "did:web:api.vckit.showthething.com",
  credentialSubject: {
    id: "did:web:api.vckit.showthething.com",
    name: "John Doe",
    age: 30,
  },
  issuanceDate: "2021-08-25T07:00:00.000Z",
  expirationDate: "2021-09-25T07:00:00.000Z",
  proof: {
    type: "Ed25519Signature2018",
    created: "2021-08-25T07:00:00.000Z",
    proofPurpose: "assertionMethod",
    verificationMethod: "did:web:api.vckit.showthething.com#key-1",
    jws: "eyJhbGciOiJFZERTQSJ9.eyJpZCI6ImRpZDp3ZWI6YXBpLnZja2l0LnNob3d0aGV0aGluZy5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJhZ2UiOjMwfQ.0Kj9qfJ3m1Cq5t6d2s7uq0j6O9JL3q1r5Xp9yUQ3wLz4Z9q9d4Qzg5Zy7w4Xo8GxhJX1t5c3Zt3cZ9bZj7QbDQ",
  },
};
export const Default: Story = {
  args: {
    processor: () => Promise.resolve({ vc: vc as VerifiableCredential }),
    formName: "DigitalLivestock",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
