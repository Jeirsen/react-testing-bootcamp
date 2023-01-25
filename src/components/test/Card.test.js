import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../Card/Card";

const cardProps = {
  name: "Sydney",
  phone: "111-111-1111",
  email: "sydney@gmail.com",
  image: {
    url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    alt: "cute cat",
  },
  favoured: false,
  updateFavourite: () => {},
  index: 1,
};

describe("Card", () => {
  test("should show name of cat", () => {
    render(<Card {...cardProps} />);

    expect(
      screen.getByRole("heading", {
        name: /sydney/i,
      })
    ).toBeInTheDocument();
  });

  test("should show phone number", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test("should show email", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/sydney@gmail.com/i)).toBeInTheDocument();
  });

  test("should show image with correct src", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test("should show outlined heart", () => {
    render(<Card {...cardProps} />);
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    render(<Card {...cardProps} favoured={true} />);
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    render(<Card {...cardProps} />);
    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
