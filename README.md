# <img src="https://res.cloudinary.com/detcvmtip/image/upload/v1655847445/finance%20fight/Stack-of-new-100-us-dollars-edition-banknotes-on-transparent-background-PNG_qmesuh_ujnnu7.png" height="30px"> Finance Fight <img src="https://res.cloudinary.com/detcvmtip/image/upload/v1655847445/finance%20fight/bitcoin-Currency-png_c57ve2_opzmfq.png" height="30px">

## About This Project

Finance Fight is a full-stack web application allowing users to make fake purchases of real stocks or cryptocurrencies to test their investing skills in a risk-free environment. Each user starts out with $10k to purchase any stocks or cryptocurrencies of their choosing. A user can make as many purchases as they wish provided they have money in their bank. Users may also sell assets at anytime to increase the funds in their bank. All purchases and sales are made at the ***current*** market value to provide the user with the experience of gaining or losing money on the investment. Users can view the leaderboard to see how their portfolio stacks up against other users.

Finance Fight is built with a Flask backend connecting to a PostgreSQL database and a React frontend. I built RESTful API's to connect to my database as well as 4 external sources for financial data. This is one of my first times working with React, so I'm excited to continue learning, revamping existing features, and building out new ones.

Check out the deployed version at [https://finance-fight.herokuapp.com/](https://finance-fight.herokuapp.com/).

## Languages & Tools Used

<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" alt="React" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" alt="JavaScript" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original-wordmark.svg" alt="HTML5" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original-wordmark.svg" alt="CSS3" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/materialui/materialui-original.svg" alt="MUI" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/bootstrap/bootstrap-original-wordmark.svg" alt="Bootstrap" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" alt="PostgreSQL" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlite/sqlite-original-wordmark.svg" alt="SQLite" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original-wordmark.svg" alt="Python" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/flask/flask-original-wordmark.svg" alt="Flask" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlalchemy/sqlalchemy-original-wordmark.svg" alt="SQL Alchemy" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" alt="Git" height="40" width="40">&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original-wordmark.svg" alt="VS Code" height="40" width="40">&nbsp;
</div>

## Future Plans/Wish List

- Allow the user to customize which symbols appear on the ticker tape scrolling at the top of the page.
- Enable search capability by company name (currently symbol only) or ability to lookup the ticker symbol.
- Deploy websockets to replace current API's for a more steady and current stream of financial data.
- CURRENTLY TACKLING...Build out functionality for user to sort leaderboard by column to create custom views.
- Integrate Stripe's payment API so users can increase their available funds with ***fake*** deposits.

## Challenges

- The biggest challenge I faced was creating the user leaderboard. I had to pull data for each asset that each user owns. In addition, I had to obtain some of that data from my database (purchase info) and some of the data from external sources (current asset values). Once the data was obtained, I then had to perform calculations and display the data in an organized manor. 
- This was one of my first projects working with React, so it took some time to get use to the built-in hooks, specifically useEffect. There were a few times where I ran into an infinite loop and had to take a closer look at the parameters being included in the dependency array.

## Financial Data Provided By

- [CoinMarketCap](https://coinmarketcap.com/api/documentation/v1/)
- [Finage](https://finage.co.uk/docs/api/getting-started)
- [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs/)
- [Finnhub](https://finnhub.io/docs/api)
- [TradingView](https://www.tradingview.com/widget/)
