interface HeaderProps {
  title: string;
  numOfTodos: number;
}

const Header = ({ title, numOfTodos }: HeaderProps) => {
  return (
    <header id="title-template">
      <label htmlFor="sidebar_toggle">
        <img src="images/hamburger.png" alt="Toggle Sidebar" />
      </label>
      <dl>
        <dt>
          <time>{title}</time>
        </dt>
        <dd>{numOfTodos}</dd>
      </dl>
    </header>
  );
};

export default Header;
