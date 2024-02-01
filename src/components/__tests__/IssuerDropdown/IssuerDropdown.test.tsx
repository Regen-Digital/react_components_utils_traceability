import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import IssuerDropdown from "../../IssuerDropdown/IssuerDropdown";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("issuer dropdown", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("should render issuer dropdown component", () => {
    render(
      <IssuerDropdown
        onChangeIssuerForm={() => {}}
        error=""
        ref={React.createRef()}
      />
    );
    expect(screen.getByText("Issuer")).not.toBeNull();
  });

  it("should render issuer dropdown component with error text", () => {
    render(
      <IssuerDropdown
        onChangeIssuerForm={() => {}}
        error="is a required property"
        ref={React.createRef()}
      />
    );
    expect(screen.getByText("is a required property")).not.toBeNull();
  });

  it("should display the value selected in the dropdown box", async () => {
    process.env.REACT_APP_LIST_ISSUERS =
      "did:web:localhost,did:web:abc.xyz.com";
    render(
      <IssuerDropdown
        onChangeIssuerForm={() => {}}
        error=""
        ref={React.createRef()}
      />
    );

    // Click on the MUI 'select' (as found by the label).
    const selectLabel = /combobox/i;
    const selectEl = await screen.findByRole(selectLabel);
    expect(selectEl).not.toBeNull();

    await waitFor(() => userEvent.click(selectEl));

    await act(async () => {
      // Locate the corresponding popup (`listbox`) of options.
      const optionsPopupEl = await screen.findByRole("listbox");

      // Click an option in the popup.
      userEvent.click(within(optionsPopupEl).getByText(/did:web:localhost/i));

      // Confirm the outcome.
      expect(await screen.findByText(/did:web:localhost/i)).not.toBeNull();
    });

    await waitFor(() => userEvent.click(selectEl));

    // select none option
    await act(async () => {
      // Locate the corresponding popup (`listbox`) of options.
      const optionsPopupEl = await screen.findByRole("listbox");

      // Click an option in the popup.
      userEvent.click(within(optionsPopupEl).getByText(/None/i));

      // Confirm the outcome.
      expect(await screen.findByText(/None/i)).not.toBeNull();
    });
  });

  it("should show empty in dropbox", async () => {
    const issuerDropDownRef = React.createRef<any>();
    render(
      <IssuerDropdown
        onChangeIssuerForm={() => {}}
        error=""
        ref={issuerDropDownRef}
      />
    );

    act(() => {
      issuerDropDownRef.current?.onClear();
    });

    expect(await document.querySelector("input")?.value).toBe("");
  });
});
