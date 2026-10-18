/* 50 practice problems following the structure of LeetCode's "Top SQL 50" study plan.
 * Statements and data are written for this app; each links to the original problem on LeetCode. */
(function (root) {
  'use strict';
  const T = (en, zh) => ({ en, zh });
  const tbl = (name, cols, rows) => ({
    name,
    cols: cols.split(',').map(c => c.trim().split(/\s+/)),
    rows
  });

  const SECTIONS = [
    { id: 'select', title: T('Select', '查询基础'), icon: 'search' },
    { id: 'joins', title: T('Basic Joins', '基础连接'), icon: 'link' },
    { id: 'aggregate', title: T('Basic Aggregate Functions', '基础聚合函数'), icon: 'sigma' },
    { id: 'grouping', title: T('Sorting and Grouping', '排序与分组'), icon: 'sort' },
    { id: 'advanced', title: T('Advanced Select and Joins', '高级查询与连接'), icon: 'blocks' },
    { id: 'subqueries', title: T('Subqueries', '子查询'), icon: 'nested' },
    { id: 'strings', title: T('Advanced String Functions / Regex / Clause', '高级字符串函数 / 正则 / 子句'), icon: 'text' }
  ];

  const P = [];
  const add = p => P.push(p);

  // ===================== SELECT =====================
  add({
    id: 1757, slug: 'recyclable-and-low-fat-products', section: 'select', level: 'easy',
    title: T('Recyclable and Low Fat Products', '可回收且低脂的产品'),
    desc: T('Find the ids of products that are <b>both</b> low fat and recyclable. <code>low_fats</code> and <code>recyclable</code> hold <code>\'Y\'</code> or <code>\'N\'</code>. Return the result in any order.',
      '找出<b>既是</b>低脂<b>又</b>可回收的产品编号。<code>low_fats</code> 和 <code>recyclable</code> 的值为 <code>\'Y\'</code> 或 <code>\'N\'</code>。结果顺序不限。'),
    tables: [tbl('Products', 'product_id INT, low_fats TEXT, recyclable TEXT',
      [[0, 'Y', 'N'], [1, 'Y', 'Y'], [2, 'N', 'Y'], [3, 'Y', 'Y'], [4, 'N', 'N'], [5, 'Y', 'Y']])],
    hints: [T('Filter rows with WHERE.', '用 WHERE 过滤行。'), T('Combine two conditions with AND.', '用 AND 连接两个条件。')],
    solution: "SELECT product_id\nFROM Products\nWHERE low_fats = 'Y' AND recyclable = 'Y';",
    explain: T('AND keeps a row only when both conditions are true.', 'AND 只保留两个条件都成立的行。')
  });
  add({
    id: 584, slug: 'find-customer-referee', section: 'select', level: 'easy',
    title: T('Find Customer Referee', '寻找用户推荐人'),
    desc: T('Return the names of customers who were <b>not</b> referred by the customer with <code>id = 2</code>. Customers without any referee count too.',
      '找出<b>不是</b>由 <code>id = 2</code> 的用户推荐的客户姓名。没有推荐人的客户也要包括在内。'),
    tables: [tbl('Customer', 'id INT, name TEXT, referee_id INT',
      [[1, 'Will', null], [2, 'Jane', null], [3, 'Alex', 2], [4, 'Bill', null], [5, 'Zack', 1], [6, 'Mark', 2], [7, 'Lina', 3]])],
    hints: [T('<code>referee_id &lt;&gt; 2</code> alone is not enough: comparisons with NULL are never true.', '只写 <code>referee_id &lt;&gt; 2</code> 不够：与 NULL 比较永远不为真。'),
      T('Add <code>OR referee_id IS NULL</code>.', '加上 <code>OR referee_id IS NULL</code>。')],
    solution: 'SELECT name\nFROM Customer\nWHERE referee_id IS NULL OR referee_id <> 2;',
    explain: T('SQL uses three-valued logic. <code>NULL &lt;&gt; 2</code> is UNKNOWN, so NULL rows must be included explicitly with IS NULL.',
      'SQL 使用三值逻辑。<code>NULL &lt;&gt; 2</code> 的结果是 UNKNOWN，所以必须用 IS NULL 显式包含空值行。')
  });
  add({
    id: 595, slug: 'big-countries', section: 'select', level: 'easy',
    title: T('Big Countries', '大的国家'),
    desc: T('A country is <b>big</b> if its area is at least 3,000,000 km² <b>or</b> its population is at least 25,000,000. Return <code>name</code>, <code>population</code> and <code>area</code> of the big countries.',
      '如果一个国家的面积至少为 3,000,000 平方公里，<b>或者</b>人口至少为 25,000,000，则它是<b>大国</b>。返回大国的 <code>name</code>、<code>population</code> 和 <code>area</code>。'),
    tables: [tbl('World', 'name TEXT, continent TEXT, area INT, population INT, gdp INT',
      [['Canada', 'America', 9984670, 38900000, 2140000000000], ['Malaysia', 'Asia', 330803, 34300000, 430000000000],
        ['Singapore', 'Asia', 728, 5900000, 500000000000], ['Australia', 'Oceania', 7692024, 26600000, 1700000000000],
        ['Iceland', 'Europe', 103000, 380000, 31000000000], ['Kazakhstan', 'Asia', 2724900, 20000000, 260000000000]])],
    hints: [T('Use OR between the area and population conditions.', '在面积和人口条件之间使用 OR。')],
    solution: 'SELECT name, population, area\nFROM World\nWHERE area >= 3000000 OR population >= 25000000;',
    explain: T('OR keeps a row when at least one condition is true.', 'OR 只要有一个条件成立就保留该行。')
  });
  add({
    id: 1148, slug: 'article-views-i', section: 'select', level: 'easy', ordered: true,
    title: T('Article Views I', '文章浏览 I'),
    desc: T('Find all authors who viewed at least one of their own articles. Return a single column <code>id</code>, sorted ascending, without duplicates.',
      '找出至少浏览过一次自己文章的作者。返回一列 <code>id</code>，升序排列且不重复。'),
    tables: [tbl('Views', 'article_id INT, author_id INT, viewer_id INT, view_date DATE',
      [[1, 3, 5, '2024-08-01'], [1, 3, 6, '2024-08-02'], [2, 7, 7, '2024-08-01'], [2, 7, 6, '2024-08-02'],
        [4, 7, 1, '2024-07-22'], [3, 4, 4, '2024-07-21'], [3, 4, 4, '2024-07-21'], [5, 2, 9, '2024-07-25']])],
    hints: [T('An author viewed their own article when <code>author_id = viewer_id</code>.', '当 <code>author_id = viewer_id</code> 时说明作者看了自己的文章。'),
      T('Use DISTINCT, an alias and ORDER BY.', '使用 DISTINCT、别名和 ORDER BY。')],
    solution: 'SELECT DISTINCT author_id AS id\nFROM Views\nWHERE author_id = viewer_id\nORDER BY id;',
    explain: T('DISTINCT removes duplicate rows; AS renames the output column.', 'DISTINCT 去除重复行；AS 给输出列改名。')
  });
  add({
    id: 1683, slug: 'invalid-tweets', section: 'select', level: 'easy',
    title: T('Invalid Tweets', '无效的推文'),
    desc: T('A tweet is invalid when its <code>content</code> is strictly longer than 15 characters. Return the <code>tweet_id</code> of invalid tweets.',
      '当推文 <code>content</code> 的字符数严格大于 15 时，该推文无效。返回无效推文的 <code>tweet_id</code>。'),
    tables: [tbl('Tweets', 'tweet_id INT, content TEXT',
      [[1, 'Let us Code'], [2, 'More than fifteen chars are here!'], [3, 'exactly15chars!'], [4, 'SQL is fun'], [5, 'Sixteen chars!!!']])],
    hints: [T('Use <code>LENGTH()</code> or <code>CHAR_LENGTH()</code>.', '使用 <code>LENGTH()</code> 或 <code>CHAR_LENGTH()</code>。')],
    solution: 'SELECT tweet_id\nFROM Tweets\nWHERE LENGTH(content) > 15;',
    explain: T('String functions can be used inside WHERE. In MySQL, <code>CHAR_LENGTH</code> counts characters while <code>LENGTH</code> counts bytes.',
      '字符串函数可以写在 WHERE 中。在 MySQL 中 <code>CHAR_LENGTH</code> 统计字符数，<code>LENGTH</code> 统计字节数。')
  });

  // ===================== BASIC JOINS =====================
  add({
    id: 1378, slug: 'replace-employee-id-with-the-unique-identifier', section: 'joins', level: 'easy',
    title: T('Replace Employee ID With The Unique Identifier', '使用唯一标识码替换员工ID'),
    desc: T('Show the <code>unique_id</code> and <code>name</code> of every employee. If an employee has no unique id, show <code>NULL</code>.',
      '展示每位员工的 <code>unique_id</code> 和 <code>name</code>。如果某员工没有唯一标识码，显示 <code>NULL</code>。'),
    tables: [tbl('Employees', 'id INT, name TEXT', [[1, 'Alice'], [7, 'Bob'], [11, 'Meir'], [90, 'Winston'], [3, 'Jonathan']]),
      tbl('EmployeeUNI', 'id INT, unique_id INT', [[3, 1], [11, 2], [90, 3]])],
    hints: [T('Every employee must appear, even without a match.', '每个员工都要出现，即使没有匹配。'), T('Use LEFT JOIN from Employees.', '从 Employees 出发使用 LEFT JOIN。')],
    solution: 'SELECT u.unique_id, e.name\nFROM Employees e\nLEFT JOIN EmployeeUNI u ON e.id = u.id;',
    explain: T('LEFT JOIN keeps all rows of the left table and fills missing right-side columns with NULL.', 'LEFT JOIN 保留左表所有行，右表无匹配时以 NULL 填充。')
  });
  add({
    id: 1068, slug: 'product-sales-analysis-i', section: 'joins', level: 'easy',
    title: T('Product Sales Analysis I', '产品销售分析 I'),
    desc: T('For every sale, report the <code>product_name</code>, <code>year</code> and <code>price</code>.', '对每一条销售记录，返回 <code>product_name</code>、<code>year</code> 和 <code>price</code>。'),
    tables: [tbl('Sales', 'sale_id INT, product_id INT, year INT, quantity INT, price INT',
      [[1, 100, 2022, 10, 5000], [2, 100, 2023, 12, 5000], [7, 200, 2023, 15, 9000], [8, 300, 2024, 3, 1200]]),
      tbl('Product', 'product_id INT, product_name TEXT', [[100, 'Nokia'], [200, 'Apple'], [300, 'Samsung'], [400, 'Xiaomi']])],
    hints: [T('Match rows on <code>product_id</code> with an INNER JOIN.', '用 INNER JOIN 按 <code>product_id</code> 匹配。')],
    solution: 'SELECT p.product_name, s.year, s.price\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id;',
    explain: T('An INNER JOIN returns only rows that have a match in both tables.', 'INNER JOIN 只返回两张表都能匹配上的行。')
  });
  add({
    id: 1581, slug: 'customer-who-visited-but-did-not-make-any-transactions', section: 'joins', level: 'easy',
    title: T('Customer Who Visited but Did Not Make Any Transactions', '进店却未进行过交易的顾客'),
    desc: T('Find customers who visited the mall without making any transaction, and how many such visits each of them made. Columns: <code>customer_id</code>, <code>count_no_trans</code>.',
      '找出进店但没有任何交易的顾客，以及他们这样的访问次数。列：<code>customer_id</code>、<code>count_no_trans</code>。'),
    tables: [tbl('Visits', 'visit_id INT, customer_id INT', [[1, 23], [2, 9], [4, 30], [5, 54], [6, 96], [7, 54], [8, 54]]),
      tbl('Transactions', 'transaction_id INT, visit_id INT, amount INT', [[2, 5, 310], [3, 5, 300], [9, 5, 200], [12, 1, 910], [13, 2, 970]])],
    hints: [T('LEFT JOIN visits to transactions, then keep rows where the transaction side is NULL.', 'Visits LEFT JOIN Transactions，然后保留交易一侧为 NULL 的行。'),
      T('Then GROUP BY customer_id and COUNT.', '再按 customer_id 分组并计数。')],
    solution: 'SELECT v.customer_id, COUNT(*) AS count_no_trans\nFROM Visits v\nLEFT JOIN Transactions t ON v.visit_id = t.visit_id\nWHERE t.transaction_id IS NULL\nGROUP BY v.customer_id;',
    explain: T('"LEFT JOIN … WHERE right.key IS NULL" is the classic anti-join: rows with no match.', '"LEFT JOIN … WHERE 右表键 IS NULL" 是经典的反连接写法：找没有匹配的行。')
  });
  add({
    id: 197, slug: 'rising-temperature', section: 'joins', level: 'easy',
    title: T('Rising Temperature', '上升的温度'),
    desc: T('Find the <code>id</code> of every date whose temperature is higher than the temperature of the <b>previous calendar day</b>. Watch out for missing days.',
      '找出温度比<b>前一天（日历上的前一天）</b>更高的日期的 <code>id</code>。注意日期可能不连续。'),
    tables: [tbl('Weather', 'id INT, recordDate DATE, temperature INT',
      [[1, '2024-01-01', 10], [2, '2024-01-02', 25], [3, '2024-01-03', 20], [4, '2024-01-04', 30], [5, '2024-01-06', 35], [6, '2024-01-07', 33]])],
    hints: [T('Self-join Weather with itself.', '把 Weather 表和自身连接。'), T('Join condition: <code>DATEDIFF(w1.recordDate, w2.recordDate) = 1</code>.', '连接条件：<code>DATEDIFF(w1.recordDate, w2.recordDate) = 1</code>。')],
    solution: 'SELECT w1.id\nFROM Weather w1\nJOIN Weather w2\n  ON DATEDIFF(w1.recordDate, w2.recordDate) = 1\nWHERE w1.temperature > w2.temperature;',
    explain: T('A self join pairs each day with the day before it. Comparing ids would be wrong because dates can have gaps.', '自连接把每一天和它的前一天配对。不能比较 id，因为日期可能有空缺。')
  });
  add({
    id: 1661, slug: 'average-time-of-process-per-machine', section: 'joins', level: 'easy',
    title: T('Average Time of Process per Machine', '每台机器的进程平均运行时间'),
    desc: T('Each process has a <code>start</code> and an <code>end</code> row. For each machine, compute the average time a process takes (end − start), rounded to 3 decimals, as <code>processing_time</code>.',
      '每个进程都有一行 <code>start</code> 和一行 <code>end</code>。计算每台机器上进程的平均耗时（end − start），保留 3 位小数，列名为 <code>processing_time</code>。'),
    tables: [tbl('Activity', 'machine_id INT, process_id INT, activity_type TEXT, timestamp REAL',
      [[0, 0, 'start', 0.712], [0, 0, 'end', 1.520], [0, 1, 'start', 3.140], [0, 1, 'end', 4.120],
        [1, 0, 'start', 0.550], [1, 0, 'end', 1.550], [1, 1, 'start', 0.430], [1, 1, 'end', 1.420],
        [2, 0, 'start', 4.100], [2, 0, 'end', 4.512], [2, 1, 'start', 2.500], [2, 1, 'end', 5.000]])],
    hints: [T('Join the table to itself: one side the start row, the other side the end row of the same process.', '自连接：一边取 start 行，另一边取同一进程的 end 行。'),
      T('Then <code>ROUND(AVG(end - start), 3)</code> per machine.', '然后每台机器计算 <code>ROUND(AVG(end - start), 3)</code>。')],
    solution: "SELECT a.machine_id,\n       ROUND(AVG(b.timestamp - a.timestamp), 3) AS processing_time\nFROM Activity a\nJOIN Activity b\n  ON a.machine_id = b.machine_id\n AND a.process_id = b.process_id\n AND a.activity_type = 'start'\n AND b.activity_type = 'end'\nGROUP BY a.machine_id;",
    explain: T('Self join turns two rows (start/end) into one row so you can subtract them.', '自连接把 start/end 两行变成一行，从而可以相减。')
  });
  add({
    id: 577, slug: 'employee-bonus', section: 'joins', level: 'easy',
    title: T('Employee Bonus', '员工奖金'),
    desc: T('Report the <code>name</code> and <code>bonus</code> of each employee whose bonus is less than 1000, including employees with no bonus at all.',
      '返回奖金少于 1000 的员工的 <code>name</code> 和 <code>bonus</code>，没有奖金的员工也要包括。'),
    tables: [tbl('Employee', 'empId INT, name TEXT, supervisor INT, salary INT',
      [[3, 'Brad', null, 4000], [1, 'John', 3, 1000], [2, 'Dan', 3, 2000], [4, 'Thomas', 3, 4000], [5, 'Ivy', 1, 3500]]),
      tbl('Bonus', 'empId INT, bonus INT', [[2, 500], [4, 2000], [5, 999]])],
    hints: [T('LEFT JOIN keeps employees without a bonus row.', 'LEFT JOIN 保留没有奖金记录的员工。'), T('Filter: <code>bonus &lt; 1000 OR bonus IS NULL</code>.', '过滤条件：<code>bonus &lt; 1000 OR bonus IS NULL</code>。')],
    solution: 'SELECT e.name, b.bonus\nFROM Employee e\nLEFT JOIN Bonus b ON e.empId = b.empId\nWHERE b.bonus < 1000 OR b.bonus IS NULL;',
    explain: T('After a LEFT JOIN the missing bonus is NULL, so the NULL case must be kept explicitly.', 'LEFT JOIN 之后缺失的奖金为 NULL，所以要显式保留 NULL 的情况。')
  });
  add({
    id: 1280, slug: 'students-and-examinations', section: 'joins', level: 'easy', ordered: true,
    title: T('Students and Examinations', '学生们参加各科测试的次数'),
    desc: T('For every student and every subject, count how many times the student attended that subject\'s exam (<code>attended_exams</code>). Include zero counts. Order by <code>student_id</code>, then <code>subject_name</code>.',
      '对每个学生和每门科目，统计该学生参加该科考试的次数（<code>attended_exams</code>），包括 0 次。按 <code>student_id</code>、<code>subject_name</code> 排序。'),
    tables: [tbl('Students', 'student_id INT, student_name TEXT', [[1, 'Alice'], [2, 'Bob'], [13, 'John'], [6, 'Alex']]),
      tbl('Subjects', 'subject_name TEXT', [['Math'], ['Physics'], ['Programming']]),
      tbl('Examinations', 'student_id INT, subject_name TEXT',
        [[1, 'Math'], [1, 'Physics'], [1, 'Programming'], [2, 'Programming'], [1, 'Physics'], [1, 'Math'], [13, 'Math'], [13, 'Programming'], [13, 'Physics'], [2, 'Math'], [1, 'Math']])],
    hints: [T('First build every (student, subject) pair with CROSS JOIN.', '先用 CROSS JOIN 生成所有（学生，科目）组合。'),
      T('Then LEFT JOIN Examinations and COUNT a column from Examinations (not *).', '再 LEFT JOIN Examinations，并 COUNT Examinations 的某一列（不是 *）。')],
    solution: 'SELECT s.student_id, s.student_name, sub.subject_name,\n       COUNT(e.student_id) AS attended_exams\nFROM Students s\nCROSS JOIN Subjects sub\nLEFT JOIN Examinations e\n  ON s.student_id = e.student_id\n AND sub.subject_name = e.subject_name\nGROUP BY s.student_id, s.student_name, sub.subject_name\nORDER BY s.student_id, sub.subject_name;',
    explain: T('<code>COUNT(col)</code> skips NULLs, so unmatched pairs give 0 while <code>COUNT(*)</code> would give 1.', '<code>COUNT(列)</code> 会跳过 NULL，所以未匹配的组合得到 0；而 <code>COUNT(*)</code> 会得到 1。')
  });
  add({
    id: 570, slug: 'managers-with-at-least-5-direct-reports', section: 'joins', level: 'medium',
    title: T('Managers with at Least 5 Direct Reports', '至少有5名直接下属的经理'),
    desc: T('Return the <code>name</code> of managers who have at least five direct reports.', '返回至少有 5 名直接下属的经理的 <code>name</code>。'),
    tables: [tbl('Employee', 'id INT, name TEXT, department TEXT, managerId INT',
      [[101, 'John', 'A', null], [102, 'Dan', 'A', 101], [103, 'James', 'A', 101], [104, 'Amy', 'A', 101], [105, 'Anne', 'A', 101],
        [106, 'Ron', 'B', 101], [107, 'Kate', 'B', 106], [108, 'Leo', 'B', 106], [109, 'Mia', 'B', 106], [110, 'Nina', 'B', 106]])],
    hints: [T('Join each employee to their manager (self join).', '把每个员工和他的经理连接起来（自连接）。'), T('GROUP BY the manager and keep groups with <code>HAVING COUNT(*) &gt;= 5</code>.', '按经理分组，并用 <code>HAVING COUNT(*) &gt;= 5</code> 过滤。')],
    solution: 'SELECT m.name\nFROM Employee m\nJOIN Employee e ON e.managerId = m.id\nGROUP BY m.id, m.name\nHAVING COUNT(*) >= 5;',
    explain: T('HAVING filters groups after aggregation, while WHERE filters rows before it.', 'HAVING 在聚合后过滤分组，WHERE 在聚合前过滤行。')
  });
  add({
    id: 1934, slug: 'confirmation-rate', section: 'joins', level: 'medium',
    title: T('Confirmation Rate', '确认率'),
    desc: T('The confirmation rate of a user is the number of <code>\'confirmed\'</code> messages divided by the total number of confirmation requests. Users with no requests have rate 0. Round to 2 decimals. Columns: <code>user_id</code>, <code>confirmation_rate</code>.',
      '用户的确认率 = <code>\'confirmed\'</code> 消息数 ÷ 确认请求总数。没有请求的用户确认率为 0。保留 2 位小数。列：<code>user_id</code>、<code>confirmation_rate</code>。'),
    tables: [tbl('Signups', 'user_id INT, time_stamp TEXT', [[3, '2024-03-21 10:16:13'], [7, '2024-01-04 13:57:59'], [2, '2024-07-29 23:09:44'], [6, '2024-12-09 10:39:37']]),
      tbl('Confirmations', 'user_id INT, time_stamp TEXT, action TEXT',
        [[3, '2024-01-06 03:30:46', 'timeout'], [3, '2024-07-14 14:00:00', 'timeout'], [7, '2024-06-12 11:57:29', 'confirmed'], [7, '2024-06-13 12:58:28', 'confirmed'],
          [7, '2024-06-14 13:59:27', 'confirmed'], [2, '2024-01-22 00:00:00', 'confirmed'], [2, '2024-02-28 23:59:59', 'timeout']])],
    hints: [T('LEFT JOIN Signups to Confirmations so every user appears.', '用 Signups LEFT JOIN Confirmations，使每个用户都出现。'),
      T('<code>AVG(action = \'confirmed\')</code> gives the rate; wrap with IFNULL(…, 0).', '<code>AVG(action = \'confirmed\')</code> 就是比例；外面套 IFNULL(…, 0)。')],
    solution: "SELECT s.user_id,\n       ROUND(IFNULL(AVG(c.action = 'confirmed'), 0), 2) AS confirmation_rate\nFROM Signups s\nLEFT JOIN Confirmations c ON s.user_id = c.user_id\nGROUP BY s.user_id;",
    explain: T('A boolean expression is 1 or 0, so its AVG is the share of true rows.', '布尔表达式的值是 1 或 0，所以它的 AVG 就是为真的比例。')
  });

  // ===================== BASIC AGGREGATE =====================
  add({
    id: 620, slug: 'not-boring-movies', section: 'aggregate', level: 'easy', ordered: true,
    title: T('Not Boring Movies', '有趣的电影'),
    desc: T('Return movies with an <b>odd</b> <code>id</code> whose description is not <code>\'boring\'</code>, ordered by <code>rating</code> descending.', '返回 <code>id</code> 为<b>奇数</b>且描述不是 <code>\'boring\'</code> 的电影，按 <code>rating</code> 降序排列。'),
    tables: [tbl('Cinema', 'id INT, movie TEXT, description TEXT, rating REAL',
      [[1, 'War', 'great 3D', 8.9], [2, 'Science', 'fiction', 8.5], [3, 'Irish', 'boring', 6.2], [4, 'Ice song', 'Fantacy', 8.6], [5, 'House card', 'Interesting', 9.1], [7, 'Dune', 'epic', 8.0]])],
    hints: [T('Odd: <code>id % 2 = 1</code> (or <code>MOD(id, 2) = 1</code>).', '奇数：<code>id % 2 = 1</code>（或 <code>MOD(id, 2) = 1</code>）。')],
    solution: "SELECT *\nFROM Cinema\nWHERE id % 2 = 1 AND description <> 'boring'\nORDER BY rating DESC;",
    explain: T('% is the remainder operator. ORDER BY … DESC sorts from high to low.', '% 是取余运算符。ORDER BY … DESC 从高到低排序。')
  });
  add({
    id: 1251, slug: 'average-selling-price', section: 'aggregate', level: 'easy',
    title: T('Average Selling Price', '平均售价'),
    desc: T('Prices change over time (valid from <code>start_date</code> to <code>end_date</code>). Find the average selling price of each product: total revenue ÷ total units, rounded to 2 decimals. Products with no sales get 0. Columns: <code>product_id</code>, <code>average_price</code>.',
      '价格随时间变化（从 <code>start_date</code> 到 <code>end_date</code> 有效）。求每个产品的平均售价 = 总收入 ÷ 总销量，保留 2 位小数。没有销量的产品为 0。列：<code>product_id</code>、<code>average_price</code>。'),
    tables: [tbl('Prices', 'product_id INT, start_date DATE, end_date DATE, price INT',
      [[1, '2024-02-17', '2024-02-28', 5], [1, '2024-03-01', '2024-03-22', 20], [2, '2024-02-01', '2024-02-20', 15], [2, '2024-02-21', '2024-03-31', 30], [3, '2024-02-21', '2024-03-31', 30]]),
      tbl('UnitsSold', 'product_id INT, purchase_date DATE, units INT',
        [[1, '2024-02-25', 100], [1, '2024-03-01', 15], [2, '2024-02-10', 200], [2, '2024-03-22', 30]])],
    hints: [T('Join on product_id AND purchase_date BETWEEN start_date AND end_date.', '连接条件：product_id 相同且 purchase_date BETWEEN start_date AND end_date。'),
      T('Weighted average: <code>SUM(price * units) / SUM(units)</code>. Use LEFT JOIN + IFNULL for products without sales.', '加权平均：<code>SUM(price * units) / SUM(units)</code>。对没有销量的产品用 LEFT JOIN + IFNULL。')],
    solution: 'SELECT p.product_id,\n       IFNULL(ROUND(SUM(p.price * u.units) / SUM(u.units), 2), 0) AS average_price\nFROM Prices p\nLEFT JOIN UnitsSold u\n  ON p.product_id = u.product_id\n AND u.purchase_date BETWEEN p.start_date AND p.end_date\nGROUP BY p.product_id;',
    explain: T('Conditions in the ON clause of a LEFT JOIN control matching without dropping left rows.', 'LEFT JOIN 的 ON 子句中的条件只影响匹配，不会删掉左表的行。')
  });
  add({
    id: 1075, slug: 'project-employees-i', section: 'aggregate', level: 'easy',
    title: T('Project Employees I', '项目员工 I'),
    desc: T('For each project, report the average experience years of its employees, rounded to 2 decimals, as <code>average_years</code>.', '求每个项目中员工的平均工作年限，保留 2 位小数，列名为 <code>average_years</code>。'),
    tables: [tbl('Project', 'project_id INT, employee_id INT', [[1, 1], [1, 2], [1, 3], [2, 1], [2, 4]]),
      tbl('Employee', 'employee_id INT, name TEXT, experience_years INT', [[1, 'Khaled', 3], [2, 'Ali', 2], [3, 'John', 1], [4, 'Doe', 2]])],
    hints: [T('Join, GROUP BY project_id, then ROUND(AVG(...), 2).', '连接后按 project_id 分组，再 ROUND(AVG(...), 2)。')],
    solution: 'SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years\nFROM Project p\nJOIN Employee e ON p.employee_id = e.employee_id\nGROUP BY p.project_id;',
    explain: T('AVG computes the mean of each group; ROUND(x, 2) keeps two decimals.', 'AVG 计算每组的平均值；ROUND(x, 2) 保留两位小数。')
  });
  add({
    id: 1633, slug: 'percentage-of-users-attended-a-contest', section: 'aggregate', level: 'easy', ordered: true,
    title: T('Percentage of Users Attended a Contest', '各赛事的用户注册率'),
    desc: T('For each contest, compute the percentage of all users who registered, rounded to 2 decimals. Order by <code>percentage</code> descending, then <code>contest_id</code> ascending.',
      '计算每个赛事的注册用户占全部用户的百分比，保留 2 位小数。按 <code>percentage</code> 降序、<code>contest_id</code> 升序排列。'),
    tables: [tbl('Users', 'user_id INT, user_name TEXT', [[6, 'Alice'], [2, 'Bob'], [7, 'Alex']]),
      tbl('Register', 'contest_id INT, user_id INT', [[215, 6], [209, 2], [208, 2], [210, 6], [208, 6], [209, 7], [209, 6], [215, 7], [208, 7], [210, 2], [207, 2], [210, 7]])],
    hints: [T('The denominator is a scalar subquery: <code>(SELECT COUNT(*) FROM Users)</code>.', '分母是一个标量子查询：<code>(SELECT COUNT(*) FROM Users)</code>。')],
    solution: 'SELECT contest_id,\n       ROUND(COUNT(user_id) * 100 / (SELECT COUNT(*) FROM Users), 2) AS percentage\nFROM Register\nGROUP BY contest_id\nORDER BY percentage DESC, contest_id;',
    explain: T('A scalar subquery returns one value that can be used anywhere an expression is allowed.', '标量子查询返回单个值，可以用在任何允许表达式的地方。')
  });
  add({
    id: 1211, slug: 'queries-quality-and-percentage', section: 'aggregate', level: 'easy',
    title: T('Queries Quality and Percentage', '查询结果的质量和占比'),
    desc: T('For each <code>query_name</code>: <code>quality</code> = average of (rating ÷ position); <code>poor_query_percentage</code> = percentage of rows with rating &lt; 3. Round both to 2 decimals.',
      '对每个 <code>query_name</code>：<code>quality</code> = (rating ÷ position) 的平均值；<code>poor_query_percentage</code> = rating &lt; 3 的行所占百分比。都保留 2 位小数。'),
    tables: [tbl('Queries', 'query_name TEXT, result TEXT, position INT, rating INT',
      [['Dog', 'Golden Retriever', 1, 5], ['Dog', 'German Shepherd', 2, 5], ['Dog', 'Mule', 200, 1], ['Cat', 'Shirazi', 5, 2], ['Cat', 'Siamese', 3, 3], ['Cat', 'Sphynx', 7, 4]])],
    hints: [T('<code>AVG(rating / position)</code> for quality.', '质量用 <code>AVG(rating / position)</code>。'), T('<code>AVG(rating &lt; 3) * 100</code> for the percentage.', '百分比用 <code>AVG(rating &lt; 3) * 100</code>。')],
    solution: 'SELECT query_name,\n       ROUND(AVG(rating / position), 2) AS quality,\n       ROUND(AVG(rating < 3) * 100, 2) AS poor_query_percentage\nFROM Queries\nGROUP BY query_name;',
    explain: T('Two different aggregates can be computed in the same GROUP BY.', '同一个 GROUP BY 中可以同时计算多个不同的聚合。')
  });
  add({
    id: 1193, slug: 'monthly-transactions-i', section: 'aggregate', level: 'medium',
    title: T('Monthly Transactions I', '每月交易 I'),
    desc: T('For each month (<code>YYYY-MM</code>) and country, report: <code>trans_count</code>, <code>approved_count</code>, <code>trans_total_amount</code>, <code>approved_total_amount</code>.',
      '按月份（<code>YYYY-MM</code>）和国家统计：<code>trans_count</code>、<code>approved_count</code>、<code>trans_total_amount</code>、<code>approved_total_amount</code>。'),
    tables: [tbl('Transactions', 'id INT, country TEXT, state TEXT, amount INT, trans_date DATE',
      [[121, 'US', 'approved', 1000, '2024-12-18'], [122, 'US', 'declined', 2000, '2024-12-19'], [123, 'US', 'approved', 2000, '2025-01-01'], [124, 'DE', 'approved', 2000, '2025-01-07'], [125, 'DE', 'declined', 500, '2025-01-20']])],
    hints: [T('<code>DATE_FORMAT(trans_date, \'%Y-%m\')</code> gives the month.', '<code>DATE_FORMAT(trans_date, \'%Y-%m\')</code> 得到月份。'),
      T('Conditional aggregation: <code>SUM(CASE WHEN state = \'approved\' THEN amount ELSE 0 END)</code>.', '条件聚合：<code>SUM(CASE WHEN state = \'approved\' THEN amount ELSE 0 END)</code>。')],
    solution: "SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month, country,\n       COUNT(*) AS trans_count,\n       SUM(state = 'approved') AS approved_count,\n       SUM(amount) AS trans_total_amount,\n       SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount\nFROM Transactions\nGROUP BY month, country;",
    explain: T('Conditional aggregation computes several filtered totals in a single pass.', '条件聚合可以一次扫描就计算出多个带条件的汇总。')
  });
  add({
    id: 1174, slug: 'immediate-food-delivery-ii', section: 'aggregate', level: 'medium',
    title: T('Immediate Food Delivery II', '即时食物配送 II'),
    desc: T('An order is <i>immediate</i> if <code>order_date = customer_pref_delivery_date</code>. Looking only at each customer\'s <b>first</b> order, return the percentage that are immediate, rounded to 2 decimals, as <code>immediate_percentage</code>.',
      '如果 <code>order_date = customer_pref_delivery_date</code>，订单为<i>即时</i>订单。只看每位顾客的<b>首单</b>，求其中即时订单的百分比，保留 2 位小数，列名 <code>immediate_percentage</code>。'),
    tables: [tbl('Delivery', 'delivery_id INT, customer_id INT, order_date DATE, customer_pref_delivery_date DATE',
      [[1, 1, '2024-08-01', '2024-08-02'], [2, 2, '2024-08-02', '2024-08-02'], [3, 1, '2024-08-11', '2024-08-12'], [4, 3, '2024-08-24', '2024-08-24'],
        [5, 3, '2024-08-21', '2024-08-22'], [6, 2, '2024-08-11', '2024-08-13'], [7, 4, '2024-08-09', '2024-08-09']])],
    hints: [T('Find first orders with <code>(customer_id, MIN(order_date))</code>.', '用 <code>(customer_id, MIN(order_date))</code> 找出首单。'), T('Filter with <code>WHERE (customer_id, order_date) IN (subquery)</code>.', '用 <code>WHERE (customer_id, order_date) IN (子查询)</code> 过滤。')],
    solution: 'SELECT ROUND(AVG(order_date = customer_pref_delivery_date) * 100, 2) AS immediate_percentage\nFROM Delivery\nWHERE (customer_id, order_date) IN (\n  SELECT customer_id, MIN(order_date)\n  FROM Delivery\n  GROUP BY customer_id\n);',
    explain: T('A multi-column IN compares tuples, which is handy for "first/latest per group" filters.', '多列 IN 比较的是元组，非常适合"每组第一条/最新一条"类的过滤。')
  });
  add({
    id: 550, slug: 'game-play-analysis-iv', section: 'aggregate', level: 'medium',
    title: T('Game Play Analysis IV', '游戏玩法分析 IV'),
    desc: T('Report the fraction of players who logged in again on the day right after their first login, rounded to 2 decimals, as <code>fraction</code>.', '求在首次登录的第二天再次登录的玩家占全部玩家的比例，保留 2 位小数，列名为 <code>fraction</code>。'),
    tables: [tbl('Activity', 'player_id INT, device_id INT, event_date DATE, games_played INT',
      [[1, 2, '2024-03-01', 5], [1, 2, '2024-03-02', 6], [2, 3, '2024-06-25', 1], [3, 1, '2024-03-02', 0], [3, 4, '2024-07-03', 5], [4, 5, '2024-01-10', 2], [4, 5, '2024-01-11', 3]])],
    hints: [T('Subquery: each player\'s first login date.', '子查询：每个玩家的首次登录日期。'), T('Join back and count logins where <code>DATEDIFF(event_date, first_login) = 1</code>; divide by the number of players.', '再连接回来，统计 <code>DATEDIFF(event_date, first_login) = 1</code> 的记录，除以玩家总数。')],
    solution: 'SELECT ROUND(COUNT(a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction\nFROM Activity a\nJOIN (\n  SELECT player_id, MIN(event_date) AS first_login\n  FROM Activity\n  GROUP BY player_id\n) f ON a.player_id = f.player_id\n   AND DATEDIFF(a.event_date, f.first_login) = 1;',
    explain: T('A derived table (subquery in FROM) lets you join against per-group results.', '派生表（FROM 中的子查询）可以让你和分组结果做连接。')
  });

  // ===================== SORTING & GROUPING =====================
  add({
    id: 2356, slug: 'number-of-unique-subjects-taught-by-each-teacher', section: 'grouping', level: 'easy',
    title: T('Number of Unique Subjects Taught by Each Teacher', '每位教师所教授的科目种类的数量'),
    desc: T('For each teacher, count the number of <b>unique</b> subjects taught, as <code>cnt</code>.', '统计每位老师教授的<b>不同</b>科目数量，列名为 <code>cnt</code>。'),
    tables: [tbl('Teacher', 'teacher_id INT, subject_id INT, dept_id INT', [[1, 2, 3], [1, 2, 4], [1, 3, 3], [2, 1, 1], [2, 2, 1], [2, 3, 1], [2, 4, 1]])],
    hints: [T('<code>COUNT(DISTINCT subject_id)</code>', '<code>COUNT(DISTINCT subject_id)</code>')],
    solution: 'SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt\nFROM Teacher\nGROUP BY teacher_id;',
    explain: T('COUNT(DISTINCT x) counts different values only once.', 'COUNT(DISTINCT x) 对相同的值只计数一次。')
  });
  add({
    id: 1141, slug: 'user-activity-for-the-past-30-days-i', section: 'grouping', level: 'easy',
    title: T('User Activity for the Past 30 Days I', '查询近30天活跃用户数'),
    desc: T('Find the daily number of active users for the 30-day period ending <b>2024-07-27</b> (inclusive). A user is active on a day if they had any activity. Columns: <code>day</code>, <code>active_users</code>. Skip days with no active users.',
      '统计截至 <b>2024-07-27</b>（包含当天）的 30 天内每天的活跃用户数。当天有任何活动即算活跃。列：<code>day</code>、<code>active_users</code>。没有活跃用户的日期不用列出。'),
    tables: [tbl('Activity', 'user_id INT, session_id INT, activity_date DATE, activity_type TEXT',
      [[1, 1, '2024-07-20', 'open_session'], [1, 1, '2024-07-20', 'scroll_down'], [1, 1, '2024-07-20', 'end_session'], [2, 4, '2024-07-20', 'open_session'],
        [2, 4, '2024-07-21', 'send_message'], [2, 4, '2024-07-21', 'end_session'], [3, 2, '2024-07-21', 'open_session'], [3, 2, '2024-07-21', 'send_message'],
        [4, 3, '2024-06-28', 'open_session'], [5, 6, '2024-06-27', 'open_session'], [6, 7, '2024-07-28', 'open_session']])],
    hints: [T('30 days ending 07-27 inclusive start on 06-28.', '截至 07-27（含）的 30 天从 06-28 开始。'), T('GROUP BY activity_date with COUNT(DISTINCT user_id).', '按 activity_date 分组并 COUNT(DISTINCT user_id)。')],
    solution: "SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users\nFROM Activity\nWHERE activity_date BETWEEN '2024-06-28' AND '2024-07-27'\nGROUP BY activity_date;",
    explain: T('BETWEEN is inclusive on both ends — off-by-one errors are the usual trap here.', 'BETWEEN 两端都包含——这里最容易犯差一错误。')
  });
  add({
    id: 1070, slug: 'product-sales-analysis-iii', section: 'grouping', level: 'medium',
    title: T('Product Sales Analysis III', '产品销售分析 III'),
    desc: T('For each product, return all sales from the <b>first year</b> it was sold: <code>product_id</code>, <code>first_year</code>, <code>quantity</code>, <code>price</code>.', '返回每个产品在其<b>首次销售年份</b>的所有销售记录：<code>product_id</code>、<code>first_year</code>、<code>quantity</code>、<code>price</code>。'),
    tables: [tbl('Sales', 'sale_id INT, product_id INT, year INT, quantity INT, price INT',
      [[1, 100, 2022, 10, 5000], [2, 100, 2023, 12, 5000], [7, 200, 2023, 15, 9000], [8, 200, 2023, 4, 8800], [9, 300, 2024, 1, 700]])],
    hints: [T('Find <code>(product_id, MIN(year))</code> first.', '先求 <code>(product_id, MIN(year))</code>。'), T('A product may have several sales in its first year — keep them all.', '一个产品在首年可能有多条销售记录——都要保留。')],
    solution: 'SELECT product_id, year AS first_year, quantity, price\nFROM Sales\nWHERE (product_id, year) IN (\n  SELECT product_id, MIN(year) FROM Sales GROUP BY product_id\n);',
    explain: T('Filtering by (group, MIN) returns every row tied for the minimum, unlike LIMIT 1.', '按（分组，最小值）过滤会返回所有并列最小的行，而 LIMIT 1 不会。')
  });
  add({
    id: 596, slug: 'classes-more-than-5-students', section: 'grouping', level: 'easy',
    title: T('Classes More Than 5 Students', '超过5名学生的课'),
    desc: T('Return every <code>class</code> that has at least five students.', '返回至少有 5 名学生的 <code>class</code>。'),
    tables: [tbl('Courses', 'student TEXT, class TEXT',
      [['A', 'Math'], ['B', 'English'], ['C', 'Math'], ['D', 'Biology'], ['E', 'Math'], ['F', 'Computer'], ['G', 'Math'], ['H', 'Math'], ['I', 'Math'],
        ['J', 'English'], ['K', 'English'], ['L', 'English']])],
    hints: [T('GROUP BY class and filter groups with HAVING.', '按 class 分组，用 HAVING 过滤分组。')],
    solution: 'SELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(student) >= 5;',
    explain: T('You cannot use an aggregate in WHERE; use HAVING instead.', 'WHERE 中不能使用聚合函数，要用 HAVING。')
  });
  add({
    id: 1729, slug: 'find-followers-count', section: 'grouping', level: 'easy', ordered: true,
    title: T('Find Followers Count', '求关注者的数量'),
    desc: T('For each user, return the number of followers as <code>followers_count</code>, ordered by <code>user_id</code>.', '返回每个用户的关注者数量 <code>followers_count</code>，按 <code>user_id</code> 排序。'),
    tables: [tbl('Followers', 'user_id INT, follower_id INT', [[0, 1], [1, 0], [2, 0], [2, 1], [3, 2], [3, 0], [3, 1]])],
    hints: [T('GROUP BY user_id, COUNT, ORDER BY.', 'GROUP BY user_id，COUNT，再 ORDER BY。')],
    solution: 'SELECT user_id, COUNT(follower_id) AS followers_count\nFROM Followers\nGROUP BY user_id\nORDER BY user_id;',
    explain: T('ORDER BY runs last, after grouping and aggregation.', 'ORDER BY 在分组和聚合之后最后执行。')
  });
  add({
    id: 619, slug: 'biggest-single-number', section: 'grouping', level: 'easy',
    title: T('Biggest Single Number', '只出现一次的最大数字'),
    desc: T('A <i>single number</i> appears exactly once in the table. Return the largest single number as <code>num</code>, or <code>NULL</code> if there is none.', '<i>单一数字</i>是在表中只出现一次的数字。返回最大的单一数字 <code>num</code>；如果不存在则返回 <code>NULL</code>。'),
    tables: [tbl('MyNumbers', 'num INT', [[8], [8], [3], [3], [1], [4], [5], [6]])],
    extra: [{ MyNumbers: [[8], [8], [7], [7], [3], [3], [3]] }],
    hints: [T('Subquery: numbers with <code>HAVING COUNT(*) = 1</code>.', '子查询：<code>HAVING COUNT(*) = 1</code> 的数字。'), T('<code>MAX()</code> over an empty set returns NULL — exactly what we need.', '对空集合求 <code>MAX()</code> 会返回 NULL——正好满足要求。')],
    solution: 'SELECT MAX(num) AS num\nFROM (\n  SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(*) = 1\n) t;',
    explain: T('Aggregates without GROUP BY always return exactly one row, even on empty input.', '没有 GROUP BY 的聚合总是恰好返回一行，即使输入为空。')
  });
  add({
    id: 1045, slug: 'customers-who-bought-all-products', section: 'grouping', level: 'medium',
    title: T('Customers Who Bought All Products', '买下所有产品的客户'),
    desc: T('Return the <code>customer_id</code> of customers who bought <b>every</b> product listed in the Product table.', '返回购买了 Product 表中<b>所有</b>产品的客户 <code>customer_id</code>。'),
    tables: [tbl('Customer', 'customer_id INT, product_key INT', [[1, 5], [2, 6], [3, 5], [3, 6], [1, 6], [4, 5], [4, 5], [4, 6], [5, 5], [5, 5]]),
      tbl('Product', 'product_key INT', [[5], [6]])],
    hints: [T('Compare <code>COUNT(DISTINCT product_key)</code> per customer with the total number of products.', '把每个客户的 <code>COUNT(DISTINCT product_key)</code> 与产品总数比较。')],
    solution: 'SELECT customer_id\nFROM Customer\nGROUP BY customer_id\nHAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);',
    explain: T('This is "relational division": count what each group has and compare with what is required.', '这是"关系除法"：统计每组拥有的数量，与所需总数比较。')
  });

  // ===================== ADVANCED SELECT & JOINS =====================
  add({
    id: 1731, slug: 'the-number-of-employees-which-report-to-each-employee', section: 'advanced', level: 'easy', ordered: true,
    title: T('The Number of Employees Which Report to Each Employee', '每位经理的下属员工数量'),
    desc: T('A manager has at least one direct report. For each manager return <code>employee_id</code>, <code>name</code>, <code>reports_count</code> and <code>average_age</code> of the reports (rounded to the nearest integer). Order by <code>employee_id</code>.',
      '经理是至少有一名直接下属的员工。对每位经理返回 <code>employee_id</code>、<code>name</code>、<code>reports_count</code> 和下属的 <code>average_age</code>（四舍五入为整数）。按 <code>employee_id</code> 排序。'),
    tables: [tbl('Employees', 'employee_id INT, name TEXT, reports_to INT, age INT',
      [[1, 'Michael', null, 45], [2, 'Alice', 1, 38], [3, 'Bob', 1, 42], [4, 'Charlie', 2, 34], [5, 'David', 2, 40], [6, 'Eve', 3, 37], [7, 'Frank', null, 50], [8, 'Grace', null, 48]])],
    hints: [T('Self join: manager <code>m</code> with report <code>e</code> where <code>e.reports_to = m.employee_id</code>.', '自连接：经理 <code>m</code> 与下属 <code>e</code>，条件 <code>e.reports_to = m.employee_id</code>。')],
    solution: 'SELECT m.employee_id, m.name,\n       COUNT(e.employee_id) AS reports_count,\n       ROUND(AVG(e.age)) AS average_age\nFROM Employees m\nJOIN Employees e ON e.reports_to = m.employee_id\nGROUP BY m.employee_id, m.name\nORDER BY m.employee_id;',
    explain: T('An INNER self join naturally drops employees with no reports.', 'INNER 自连接自然会去掉没有下属的员工。')
  });
  add({
    id: 1789, slug: 'primary-department-for-each-employee', section: 'advanced', level: 'easy',
    title: T('Primary Department for Each Employee', '员工的直属部门'),
    desc: T('Employees in several departments mark one as primary (<code>primary_flag = \'Y\'</code>). Employees in only one department have flag <code>\'N\'</code>. Return each employee\'s primary <code>department_id</code>.',
      '属于多个部门的员工会把其中一个标记为直属（<code>primary_flag = \'Y\'</code>）。只属于一个部门的员工标记为 <code>\'N\'</code>。返回每位员工的直属 <code>department_id</code>。'),
    tables: [tbl('Employee', 'employee_id INT, department_id INT, primary_flag TEXT',
      [[1, 1, 'N'], [2, 1, 'Y'], [2, 2, 'N'], [3, 3, 'N'], [4, 2, 'N'], [4, 3, 'Y'], [4, 4, 'N']])],
    hints: [T('Two cases: flag = \'Y\', or the employee has exactly one row.', '两种情况：标记为 \'Y\'，或者该员工只有一行记录。')],
    solution: "SELECT employee_id, department_id\nFROM Employee\nWHERE primary_flag = 'Y'\n   OR employee_id IN (\n     SELECT employee_id FROM Employee GROUP BY employee_id HAVING COUNT(*) = 1\n   );",
    explain: T('Combining a simple filter with an IN-subquery handles both cases in one query.', '把简单条件和 IN 子查询组合，一条查询处理两种情况。')
  });
  add({
    id: 610, slug: 'triangle-judgement', section: 'advanced', level: 'easy',
    title: T('Triangle Judgement', '判断三角形'),
    desc: T('For each row of three segment lengths, report whether they can form a triangle in a column <code>triangle</code> (<code>\'Yes\'</code>/<code>\'No\'</code>).', '对于每行的三条线段长度，判断能否构成三角形，在 <code>triangle</code> 列中输出 <code>\'Yes\'</code>/<code>\'No\'</code>。'),
    tables: [tbl('Triangle', 'x INT, y INT, z INT', [[13, 15, 30], [10, 20, 15], [3, 4, 5], [1, 1, 2]])],
    hints: [T('Triangle inequality: every pair sums to more than the third side.', '三角形不等式：任意两边之和大于第三边。'), T('Use <code>CASE WHEN … THEN \'Yes\' ELSE \'No\' END</code>.', '使用 <code>CASE WHEN … THEN \'Yes\' ELSE \'No\' END</code>。')],
    solution: "SELECT x, y, z,\n       CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle\nFROM Triangle;",
    explain: T('CASE is SQL\'s if/else expression and can produce a new column.', 'CASE 是 SQL 的 if/else 表达式，可以生成新列。')
  });
  add({
    id: 180, slug: 'consecutive-numbers', section: 'advanced', level: 'medium',
    title: T('Consecutive Numbers', '连续出现的数字'),
    desc: T('Find all numbers that appear at least three times in a row (consecutive <code>id</code>s). Column: <code>ConsecutiveNums</code>.', '找出所有至少连续出现三次的数字（<code>id</code> 连续）。列名：<code>ConsecutiveNums</code>。'),
    tables: [tbl('Logs', 'id INT, num INT', [[1, 1], [2, 1], [3, 1], [4, 2], [5, 1], [6, 2], [7, 2], [8, 3], [9, 3], [10, 3], [11, 3]])],
    hints: [T('Join Logs three times: id, id+1, id+2.', '把 Logs 连接三次：id、id+1、id+2。'), T('Or use <code>LAG()</code>/<code>LEAD()</code> window functions. Don\'t forget DISTINCT.', '也可以用 <code>LAG()</code>/<code>LEAD()</code> 窗口函数。别忘了 DISTINCT。')],
    solution: 'SELECT DISTINCT l1.num AS ConsecutiveNums\nFROM Logs l1\nJOIN Logs l2 ON l2.id = l1.id + 1 AND l2.num = l1.num\nJOIN Logs l3 ON l3.id = l1.id + 2 AND l3.num = l1.num;',
    explain: T('Joining a table to shifted copies of itself lets you compare neighbouring rows.', '把表和"错位"的自身副本连接，就能比较相邻行。')
  });
  add({
    id: 1164, slug: 'product-price-at-a-given-date', section: 'advanced', level: 'medium',
    title: T('Product Price at a Given Date', '指定日期的产品价格'),
    desc: T('All products start at price 10. Each row records a price change. Return the price of every product on <b>2024-08-16</b>. Columns: <code>product_id</code>, <code>price</code>.', '所有产品初始价格都是 10。每一行记录一次价格变动。返回所有产品在 <b>2024-08-16</b> 的价格。列：<code>product_id</code>、<code>price</code>。'),
    tables: [tbl('Products', 'product_id INT, new_price INT, change_date DATE',
      [[1, 20, '2024-08-14'], [2, 50, '2024-08-14'], [1, 30, '2024-08-15'], [1, 35, '2024-08-16'], [2, 65, '2024-08-17'], [3, 20, '2024-08-18']])],
    hints: [T('Latest change on or before the date: <code>MAX(change_date) … WHERE change_date &lt;= \'2024-08-16\'</code>.', '截至该日期的最后一次变动：<code>MAX(change_date) … WHERE change_date &lt;= \'2024-08-16\'</code>。'),
      T('Start from the list of all products and LEFT JOIN; default with IFNULL(…, 10).', '从全部产品出发 LEFT JOIN；用 IFNULL(…, 10) 给默认值。')],
    solution: "SELECT p.product_id, IFNULL(c.new_price, 10) AS price\nFROM (SELECT DISTINCT product_id FROM Products) p\nLEFT JOIN (\n  SELECT product_id, new_price\n  FROM Products\n  WHERE (product_id, change_date) IN (\n    SELECT product_id, MAX(change_date)\n    FROM Products\n    WHERE change_date <= '2024-08-16'\n    GROUP BY product_id\n  )\n) c ON p.product_id = c.product_id;",
    explain: T('Build the "full list" first, then attach optional data with LEFT JOIN and a default.', '先构造"完整列表"，再用 LEFT JOIN 附加可选数据并设定默认值。')
  });
  add({
    id: 1204, slug: 'last-person-to-fit-in-the-bus', section: 'advanced', level: 'medium',
    title: T('Last Person to Fit in the Bus', '最后一个能进入巴士的人'),
    desc: T('People board in order of <code>turn</code>. The bus holds at most 1000 kg. Return the <code>person_name</code> of the last person who can board without exceeding the limit.', '人们按 <code>turn</code> 顺序上车。巴士最多承重 1000 公斤。返回在不超重的情况下最后一个上车的人的 <code>person_name</code>。'),
    tables: [tbl('Queue', 'person_id INT, person_name TEXT, weight INT, turn INT',
      [[5, 'Alice', 250, 1], [4, 'Bob', 175, 5], [3, 'Alex', 350, 2], [6, 'John Cena', 400, 3], [1, 'Winston', 500, 6], [2, 'Marie', 200, 4]])],
    hints: [T('Running total: <code>SUM(weight) OVER (ORDER BY turn)</code>.', '累计和：<code>SUM(weight) OVER (ORDER BY turn)</code>。'), T('Keep rows with total ≤ 1000, take the one with the biggest turn.', '保留累计 ≤ 1000 的行，取 turn 最大的那一个。')],
    solution: 'SELECT person_name\nFROM (\n  SELECT person_name, turn,\n         SUM(weight) OVER (ORDER BY turn) AS total\n  FROM Queue\n) t\nWHERE total <= 1000\nORDER BY turn DESC\nLIMIT 1;',
    explain: T('Window functions compute values across rows without collapsing them like GROUP BY does.', '窗口函数可以跨行计算，而不像 GROUP BY 那样把行合并。')
  });
  add({
    id: 1907, slug: 'count-salary-categories', section: 'advanced', level: 'medium',
    title: T('Count Salary Categories', '按分类统计薪水'),
    desc: T('Count accounts in each category: <code>\'Low Salary\'</code> (&lt; 20000), <code>\'Average Salary\'</code> (20000–50000 inclusive), <code>\'High Salary\'</code> (&gt; 50000). All three categories must appear, even with 0. Columns: <code>category</code>, <code>accounts_count</code>.',
      '统计每个类别的账户数：<code>\'Low Salary\'</code>（&lt; 20000）、<code>\'Average Salary\'</code>（20000–50000，含边界）、<code>\'High Salary\'</code>（&gt; 50000）。三个类别都必须出现，即使为 0。列：<code>category</code>、<code>accounts_count</code>。'),
    tables: [tbl('Accounts', 'account_id INT, income INT', [[3, 108939], [2, 12747], [8, 87709], [6, 91796], [9, 5000]])],
    hints: [T('GROUP BY can\'t produce a category with no rows.', 'GROUP BY 无法生成没有任何行的类别。'), T('Write three SELECTs (one per category) and combine them with UNION ALL.', '写三个 SELECT（每个类别一个），用 UNION ALL 合并。')],
    solution: "SELECT 'Low Salary' AS category, SUM(income < 20000) AS accounts_count FROM Accounts\nUNION ALL\nSELECT 'Average Salary', SUM(income BETWEEN 20000 AND 50000) FROM Accounts\nUNION ALL\nSELECT 'High Salary', SUM(income > 50000) FROM Accounts;",
    explain: T('UNION ALL stacks result sets vertically; columns are named by the first SELECT.', 'UNION ALL 把结果集纵向拼接；列名取自第一个 SELECT。')
  });

  // ===================== SUBQUERIES =====================
  add({
    id: 1978, slug: 'employees-whose-manager-left-the-company', section: 'subqueries', level: 'easy', ordered: true,
    title: T('Employees Whose Manager Left the Company', '上级经理已离职的公司员工'),
    desc: T('Find employees with salary &lt; 30000 whose manager has left the company (the <code>manager_id</code> is no longer in the table). Return <code>employee_id</code> ordered ascending.', '找出薪水低于 30000 且其经理已离职（<code>manager_id</code> 已不在表中）的员工。返回 <code>employee_id</code>，升序排列。'),
    tables: [tbl('Employees', 'employee_id INT, name TEXT, manager_id INT, salary INT',
      [[3, 'Mila', 9, 60301], [12, 'Antonella', null, 31000], [13, 'Emery', null, 67084], [1, 'Kalel', 11, 21241], [9, 'Mikaela', null, 50937], [11, 'Joziah', 6, 28485], [14, 'Lio', 20, 25000]])],
    hints: [T('<code>manager_id NOT IN (SELECT employee_id FROM Employees)</code>', '<code>manager_id NOT IN (SELECT employee_id FROM Employees)</code>'), T('Exclude employees with no manager (NULL).', '排除没有经理（NULL）的员工。')],
    solution: 'SELECT employee_id\nFROM Employees\nWHERE salary < 30000\n  AND manager_id IS NOT NULL\n  AND manager_id NOT IN (SELECT employee_id FROM Employees)\nORDER BY employee_id;',
    explain: T('Beware: if the NOT IN subquery returns any NULL, nothing matches. Here employee_id is never NULL, so it is safe.', '注意：如果 NOT IN 的子查询结果中含有 NULL，将没有任何行匹配。这里 employee_id 不会为 NULL，所以是安全的。')
  });
  add({
    id: 626, slug: 'exchange-seats', section: 'subqueries', level: 'medium', ordered: true,
    title: T('Exchange Seats', '换座位'),
    desc: T('Swap the seat <code>id</code> of every two consecutive students. If the number of students is odd, the last one keeps their seat. Return <code>id</code>, <code>student</code> ordered by <code>id</code>.', '交换每两个相邻学生的座位 <code>id</code>。如果学生人数是奇数，最后一个学生的座位不变。返回 <code>id</code>、<code>student</code>，按 <code>id</code> 排序。'),
    tables: [tbl('Seat', 'id INT, student TEXT', [[1, 'Abbot'], [2, 'Doris'], [3, 'Emerson'], [4, 'Green'], [5, 'Jeames']])],
    hints: [T('Odd id → id + 1, even id → id − 1…', '奇数 id → id + 1，偶数 id → id − 1……'), T('…except the last odd id: compare with <code>(SELECT MAX(id) FROM Seat)</code>.', '……最后一个奇数 id 除外：和 <code>(SELECT MAX(id) FROM Seat)</code> 比较。')],
    solution: 'SELECT CASE\n         WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id\n         WHEN id % 2 = 1 THEN id + 1\n         ELSE id - 1\n       END AS id,\n       student\nFROM Seat\nORDER BY id;',
    explain: T('Instead of moving students, compute each student\'s new id with CASE.', '不需要移动学生，用 CASE 计算每个学生的新 id 即可。')
  });
  add({
    id: 1341, slug: 'movie-rating', section: 'subqueries', level: 'medium', ordered: true,
    title: T('Movie Rating', '电影评分'),
    desc: T('Return two rows in a column <code>results</code>: (1) the name of the user who rated the most movies (alphabetically smallest on ties); (2) the title of the movie with the highest average rating in <b>February 2024</b> (alphabetically smallest on ties).<br><small>Engine note: SQLite does not allow parentheses around UNION members — wrap each part as <code>SELECT * FROM (…)</code>.</small>',
      '在 <code>results</code> 列中返回两行：(1) 评分电影数量最多的用户名（并列时取字典序最小）；(2) <b>2024 年 2 月</b>平均评分最高的电影名（并列时取字典序最小）。<br><small>引擎提示：SQLite 不允许在 UNION 的各部分外加括号——请写成 <code>SELECT * FROM (…)</code>。</small>'),
    tables: [tbl('Movies', 'movie_id INT, title TEXT', [[1, 'Avengers'], [2, 'Frozen 2'], [3, 'Joker']]),
      tbl('Users', 'user_id INT, name TEXT', [[1, 'Daniel'], [2, 'Monica'], [3, 'Maria'], [4, 'James']]),
      tbl('MovieRating', 'movie_id INT, user_id INT, rating INT, created_at DATE',
        [[1, 1, 3, '2024-01-12'], [1, 2, 4, '2024-02-11'], [1, 3, 2, '2024-02-12'], [1, 4, 1, '2024-01-01'], [2, 1, 5, '2024-02-17'],
          [2, 2, 2, '2024-02-01'], [2, 3, 2, '2024-03-01'], [3, 1, 3, '2024-02-22'], [3, 2, 4, '2024-02-25']])],
    hints: [T('Part 1: GROUP BY user, <code>ORDER BY COUNT(*) DESC, name LIMIT 1</code>.', '第一部分：按用户分组，<code>ORDER BY COUNT(*) DESC, name LIMIT 1</code>。'),
      T('Part 2: filter Feb 2024, GROUP BY movie, <code>ORDER BY AVG(rating) DESC, title LIMIT 1</code>. Combine with UNION ALL.', '第二部分：筛选 2024 年 2 月，按电影分组，<code>ORDER BY AVG(rating) DESC, title LIMIT 1</code>。用 UNION ALL 合并。')],
    solution: "SELECT * FROM (\n  SELECT u.name AS results\n  FROM MovieRating r JOIN Users u ON r.user_id = u.user_id\n  GROUP BY u.user_id, u.name\n  ORDER BY COUNT(*) DESC, u.name\n  LIMIT 1\n)\nUNION ALL\nSELECT * FROM (\n  SELECT m.title\n  FROM MovieRating r JOIN Movies m ON r.movie_id = m.movie_id\n  WHERE r.created_at BETWEEN '2024-02-01' AND '2024-02-29'\n  GROUP BY m.movie_id, m.title\n  ORDER BY AVG(r.rating) DESC, m.title\n  LIMIT 1\n);",
    explain: T('Tie-breaking is done by adding a second ORDER BY key. UNION ALL keeps both rows even if they are equal.', '通过增加第二个 ORDER BY 键来打破平局。UNION ALL 即使两行相同也会都保留。')
  });
  add({
    id: 1321, slug: 'restaurant-growth', section: 'subqueries', level: 'medium', ordered: true,
    title: T('Restaurant Growth', '餐馆营业额变化增长'),
    desc: T('Compute a 7-day moving window (the current day plus the 6 days before) of total <code>amount</code> and its <code>average_amount</code> (÷ 7, rounded to 2). Start from the first day that has 6 previous days. Several customers may visit on the same day. Order by <code>visited_on</code>.',
      '计算 7 天滑动窗口（当天加前 6 天）的营业额总和 <code>amount</code> 及平均值 <code>average_amount</code>（÷ 7，保留 2 位）。从第一个拥有前 6 天数据的日期开始。同一天可能有多位顾客。按 <code>visited_on</code> 排序。'),
    tables: [tbl('Customer', 'customer_id INT, name TEXT, visited_on DATE, amount INT',
      [[1, 'Jhon', '2024-01-01', 100], [2, 'Daniel', '2024-01-02', 110], [3, 'Jade', '2024-01-03', 120], [4, 'Khaled', '2024-01-04', 130], [5, 'Winston', '2024-01-05', 110],
        [6, 'Elvis', '2024-01-06', 140], [7, 'Anna', '2024-01-07', 150], [8, 'Maria', '2024-01-08', 80], [9, 'Jaze', '2024-01-09', 110], [1, 'Jhon', '2024-01-10', 130], [3, 'Jade', '2024-01-10', 150]])],
    hints: [T('Pair each distinct day <code>d</code> with all visits where <code>DATEDIFF(d, visited_on) BETWEEN 0 AND 6</code>.', '把每个不同的日期 <code>d</code> 与所有满足 <code>DATEDIFF(d, visited_on) BETWEEN 0 AND 6</code> 的访问配对。'),
      T('Only keep days ≥ first day + 6: <code>DATE_ADD(MIN(visited_on), INTERVAL 6 DAY)</code>.', '只保留 ≥ 首日 + 6 的日期：<code>DATE_ADD(MIN(visited_on), INTERVAL 6 DAY)</code>。')],
    solution: 'SELECT d.visited_on,\n       SUM(c.amount) AS amount,\n       ROUND(SUM(c.amount) / 7, 2) AS average_amount\nFROM (SELECT DISTINCT visited_on FROM Customer) d\nJOIN Customer c\n  ON DATEDIFF(d.visited_on, c.visited_on) BETWEEN 0 AND 6\nWHERE d.visited_on >= (SELECT DATE_ADD(MIN(visited_on), INTERVAL 6 DAY) FROM Customer)\nGROUP BY d.visited_on\nORDER BY d.visited_on;',
    explain: T('A range self join builds the sliding window; first aggregate per day if you prefer window functions.', '范围自连接可以构造滑动窗口；如果用窗口函数，需先按天汇总。')
  });
  add({
    id: 602, slug: 'friend-requests-ii-who-has-the-most-friends', section: 'subqueries', level: 'medium',
    title: T('Friend Requests II: Who Has the Most Friends', '好友申请 II：谁有最多的好友'),
    desc: T('Each accepted request makes the requester and the accepter friends. Return the person with the most friends and the count: <code>id</code>, <code>num</code>. There is exactly one such person.', '每个被接受的好友申请会让申请者和接受者成为好友。返回好友最多的人及其好友数：<code>id</code>、<code>num</code>。只有一个这样的人。'),
    tables: [tbl('RequestAccepted', 'requester_id INT, accepter_id INT, accept_date DATE', [[1, 2, '2024-06-03'], [1, 3, '2024-06-08'], [2, 3, '2024-06-08'], [3, 4, '2024-06-09'], [5, 3, '2024-06-10']])],
    hints: [T('Stack both columns into one with UNION ALL.', '用 UNION ALL 把两列堆成一列。'), T('Then GROUP BY id, ORDER BY count DESC LIMIT 1.', '再按 id 分组，ORDER BY 计数 DESC LIMIT 1。')],
    solution: 'SELECT id, COUNT(*) AS num\nFROM (\n  SELECT requester_id AS id FROM RequestAccepted\n  UNION ALL\n  SELECT accepter_id FROM RequestAccepted\n) t\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;',
    explain: T('UNION ALL (not UNION) is required here because duplicates are meaningful counts.', '这里必须用 UNION ALL（而不是 UNION），因为重复值代表有效的计数。')
  });
  add({
    id: 585, slug: 'investments-in-2016', section: 'subqueries', level: 'medium',
    title: T('Investments in 2016', '2016年的投资'),
    desc: T('Sum <code>tiv_2016</code> (rounded to 2) for policyholders who (1) share their <code>tiv_2015</code> value with at least one other policyholder and (2) are at a unique <code>(lat, lon)</code> location.', '对满足以下条件的投保人求 <code>tiv_2016</code> 之和（保留 2 位）：(1) 其 <code>tiv_2015</code> 与至少一个其他投保人相同；(2) 其 <code>(lat, lon)</code> 位置唯一。'),
    tables: [tbl('Insurance', 'pid INT, tiv_2015 REAL, tiv_2016 REAL, lat REAL, lon REAL',
      [[1, 10, 5, 10, 10], [2, 20, 20, 20, 20], [3, 10, 30, 20, 20], [4, 10, 40, 40, 40], [5, 30, 15, 50, 50], [6, 30, 25.5, 60, 60]])],
    hints: [T('Two IN subqueries with GROUP BY … HAVING.', '两个带 GROUP BY … HAVING 的 IN 子查询。')],
    solution: 'SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016\nFROM Insurance\nWHERE tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1)\n  AND (lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1);',
    explain: T('Each condition is a "group property" — compute it with a grouped subquery and test membership.', '每个条件都是"分组属性"——用分组子查询计算后再判断是否属于。')
  });
  add({
    id: 185, slug: 'department-top-three-salaries', section: 'subqueries', level: 'hard',
    title: T('Department Top Three Salaries', '部门工资前三高的所有员工'),
    desc: T('A high earner earns one of the top three <b>unique</b> salaries in their department. Return <code>Department</code>, <code>Employee</code>, <code>Salary</code> of all high earners.', '高收入者是指工资位于其部门前三个<b>不同</b>工资之列的员工。返回所有高收入者的 <code>Department</code>、<code>Employee</code>、<code>Salary</code>。'),
    tables: [tbl('Employee', 'id INT, name TEXT, salary INT, departmentId INT',
      [[1, 'Joe', 85000, 1], [2, 'Henry', 80000, 2], [3, 'Sam', 60000, 2], [4, 'Max', 90000, 1], [5, 'Janet', 69000, 1], [6, 'Randy', 85000, 1], [7, 'Will', 70000, 1], [8, 'Lee', 65000, 1]]),
      tbl('Department', 'id INT, name TEXT', [[1, 'IT'], [2, 'Sales']])],
    hints: [T('<code>DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)</code>', '<code>DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)</code>'), T('Keep rank ≤ 3. DENSE_RANK gives ties the same rank without gaps.', '保留排名 ≤ 3。DENSE_RANK 让并列者排名相同且不跳号。')],
    solution: 'SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary\nFROM (\n  SELECT *, DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rk\n  FROM Employee\n) e\nJOIN Department d ON e.departmentId = d.id\nWHERE e.rk <= 3;',
    explain: T('RANK skips numbers after ties (1,1,3); DENSE_RANK doesn\'t (1,1,2); ROW_NUMBER never ties.', 'RANK 在并列后跳号（1,1,3）；DENSE_RANK 不跳号（1,1,2）；ROW_NUMBER 从不并列。')
  });

  // ===================== STRINGS / REGEX / CLAUSE =====================
  add({
    id: 1667, slug: 'fix-names-in-a-table', section: 'strings', level: 'easy', ordered: true,
    title: T('Fix Names in a Table', '修复表中的名字'),
    desc: T('Fix the names so that only the first character is uppercase and the rest are lowercase. Return <code>user_id</code>, <code>name</code> ordered by <code>user_id</code>.', '修复名字，使得只有首字母大写，其余字母小写。返回 <code>user_id</code>、<code>name</code>，按 <code>user_id</code> 排序。'),
    tables: [tbl('Users', 'user_id INT, name TEXT', [[1, 'aLice'], [2, 'bOB'], [3, 'cHARLIE'], [4, 'd']])],
    hints: [T('<code>UPPER(LEFT(name, 1))</code> + <code>LOWER(SUBSTRING(name, 2))</code>', '<code>UPPER(LEFT(name, 1))</code> + <code>LOWER(SUBSTRING(name, 2))</code>'), T('Join strings with <code>CONCAT()</code> (or <code>||</code>).', '用 <code>CONCAT()</code>（或 <code>||</code>）拼接字符串。')],
    solution: 'SELECT user_id,\n       CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) AS name\nFROM Users\nORDER BY user_id;',
    explain: T('String functions compose: take pieces, transform them, and glue them back together.', '字符串函数可以组合使用：截取、转换、再拼接。')
  });
  add({
    id: 1527, slug: 'patients-with-a-condition', section: 'strings', level: 'easy',
    title: T('Patients With a Condition', '患某种疾病的患者'),
    desc: T('<code>conditions</code> holds space-separated codes. Return all columns for patients with Type I Diabetes: a code that <b>starts with</b> <code>DIAB1</code>.', '<code>conditions</code> 包含以空格分隔的代码。返回患有 I 型糖尿病的患者的所有列：即有代码以 <code>DIAB1</code> <b>开头</b>。'),
    tables: [tbl('Patients', 'patient_id INT, patient_name TEXT, conditions TEXT',
      [[1, 'Daniel', 'YFEV COUGH'], [2, 'Alice', ''], [3, 'Bob', 'DIAB100 MYOP'], [4, 'George', 'ACNE DIAB100'], [5, 'Alain', 'DIAB201'], [6, 'Sara', 'SADIAB100']])],
    hints: [T('Either the code is first: <code>LIKE \'DIAB1%\'</code>…', '要么代码在开头：<code>LIKE \'DIAB1%\'</code>……'), T('…or after a space: <code>LIKE \'% DIAB1%\'</code>.', '……要么在空格之后：<code>LIKE \'% DIAB1%\'</code>。')],
    solution: "SELECT *\nFROM Patients\nWHERE conditions LIKE 'DIAB1%'\n   OR conditions LIKE '% DIAB1%';",
    explain: T('In LIKE, % matches any sequence of characters and _ matches one character. "SADIAB100" must not match.', 'LIKE 中 % 匹配任意长度字符，_ 匹配单个字符。"SADIAB100" 不应匹配。')
  });
  add({
    id: 196, slug: 'delete-duplicate-emails', section: 'strings', level: 'easy', mutation: true,
    check: 'SELECT id, email FROM Person ORDER BY id', ordered: true,
    title: T('Delete Duplicate Emails', '删除重复的电子邮箱'),
    desc: T('Write a <b>DELETE</b> statement that removes duplicate emails, keeping only the row with the smallest <code>id</code> for each email. The checker then inspects the Person table.<br><small>Engine note: SQLite doesn\'t support MySQL\'s multi-table <code>DELETE p1 FROM …</code>; use a subquery.</small>',
      '编写一条 <b>DELETE</b> 语句删除重复的邮箱，每个邮箱只保留 <code>id</code> 最小的那行。判题器之后会检查 Person 表。<br><small>引擎提示：SQLite 不支持 MySQL 的多表 <code>DELETE p1 FROM …</code>，请使用子查询。</small>'),
    tables: [tbl('Person', 'id INT, email TEXT', [[1, 'john@example.com'], [2, 'bob@example.com'], [3, 'john@example.com'], [4, 'amy@example.com'], [5, 'bob@example.com']])],
    hints: [T('The rows to keep: <code>SELECT MIN(id) FROM Person GROUP BY email</code>.', '要保留的行：<code>SELECT MIN(id) FROM Person GROUP BY email</code>。'), T('Delete everything else with <code>NOT IN</code>.', '用 <code>NOT IN</code> 删除其余行。')],
    solution: 'DELETE FROM Person\nWHERE id NOT IN (\n  SELECT MIN(id) FROM Person GROUP BY email\n);',
    explain: T('DELETE … WHERE removes matching rows. Always test the WHERE with a SELECT first!', 'DELETE … WHERE 删除匹配的行。务必先用 SELECT 测试 WHERE 条件！')
  });
  add({
    id: 176, slug: 'second-highest-salary', section: 'strings', level: 'medium',
    title: T('Second Highest Salary', '第二高的薪水'),
    desc: T('Return the second highest <b>distinct</b> salary as <code>SecondHighestSalary</code>. If it does not exist, return <code>NULL</code>.', '返回第二高的<b>不同</b>薪水，列名为 <code>SecondHighestSalary</code>。如果不存在，返回 <code>NULL</code>。'),
    tables: [tbl('Employee', 'id INT, salary INT', [[1, 100], [2, 200], [3, 300], [4, 300]])],
    extra: [{ Employee: [[1, 100]] }],
    hints: [T('<code>ORDER BY salary DESC LIMIT 1 OFFSET 1</code> on distinct salaries.', '对去重后的薪水使用 <code>ORDER BY salary DESC LIMIT 1 OFFSET 1</code>。'), T('Wrap it in a scalar subquery so an empty result becomes NULL.', '把它包在标量子查询中，空结果就会变成 NULL。')],
    solution: 'SELECT (\n  SELECT DISTINCT salary\n  FROM Employee\n  ORDER BY salary DESC\n  LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;',
    explain: T('A scalar subquery that returns no rows evaluates to NULL — this is a common trick.', '没有返回行的标量子查询的值是 NULL——这是常用技巧。')
  });
  add({
    id: 1484, slug: 'group-sold-products-by-the-date', section: 'strings', level: 'easy', ordered: true,
    title: T('Group Sold Products By The Date', '按日期分组销售产品'),
    desc: T('For each <code>sell_date</code>, return the number of different products sold (<code>num_sold</code>) and their names sorted alphabetically and joined by commas (<code>products</code>). Order by <code>sell_date</code>.', '对每个 <code>sell_date</code>，返回售出的不同产品数量（<code>num_sold</code>）以及按字母排序并用逗号连接的产品名（<code>products</code>）。按 <code>sell_date</code> 排序。'),
    tables: [tbl('Activities', 'sell_date DATE, product TEXT',
      [['2024-05-30', 'Headphone'], ['2024-06-01', 'Pencil'], ['2024-06-02', 'Mask'], ['2024-05-30', 'Basketball'], ['2024-06-01', 'Bible'], ['2024-06-02', 'Mask'], ['2024-05-30', 'T-Shirt']])],
    hints: [T('<code>GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR \',\')</code>', '<code>GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR \',\')</code>')],
    solution: "SELECT sell_date,\n       COUNT(DISTINCT product) AS num_sold,\n       GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date;",
    explain: T('GROUP_CONCAT is an aggregate that joins strings of a group into one string.', 'GROUP_CONCAT 是把一组字符串拼接成一个字符串的聚合函数。')
  });
  add({
    id: 1327, slug: 'list-the-products-ordered-in-a-period', section: 'strings', level: 'easy',
    title: T('List the Products Ordered in a Period', '列出指定时间段内所有的下单产品'),
    desc: T('Return the names of products with at least 100 units ordered in <b>February 2024</b>, and the amount: <code>product_name</code>, <code>unit</code>.', '返回在 <b>2024 年 2 月</b>下单量至少为 100 的产品名称及数量：<code>product_name</code>、<code>unit</code>。'),
    tables: [tbl('Products', 'product_id INT, product_name TEXT, product_category TEXT',
      [[1, 'Leetcode Solutions', 'Book'], [2, 'Jewels of Stringology', 'Book'], [3, 'HP', 'Laptop'], [4, 'Lenovo', 'Laptop'], [5, 'Leetcode Kit', 'T-shirt']]),
      tbl('Orders', 'product_id INT, order_date DATE, unit INT',
        [[1, '2024-02-05', 60], [1, '2024-02-10', 70], [2, '2024-01-18', 30], [2, '2024-02-11', 80], [3, '2024-02-17', 2], [3, '2024-02-24', 3],
          [4, '2024-03-01', 20], [4, '2024-03-04', 30], [4, '2024-03-04', 60], [5, '2024-02-25', 50], [5, '2024-02-27', 50], [5, '2024-03-01', 50]])],
    hints: [T('Filter the dates first (WHERE), then aggregate, then filter the totals (HAVING).', '先过滤日期（WHERE），再聚合，最后过滤总量（HAVING）。')],
    solution: "SELECT p.product_name, SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE o.order_date BETWEEN '2024-02-01' AND '2024-02-29'\nGROUP BY p.product_id, p.product_name\nHAVING SUM(o.unit) >= 100;",
    explain: T('Logical order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.', '逻辑执行顺序：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT。')
  });
  add({
    id: 1517, slug: 'find-users-with-valid-e-mails', section: 'strings', level: 'easy',
    title: T('Find Users With Valid E-Mails', '查找拥有有效邮箱的用户'),
    desc: T('A valid email has a prefix that <b>starts with a letter</b> and contains only letters, digits, underscore <code>_</code>, period <code>.</code> and dash <code>-</code>, followed by the domain <code>@example.com</code>. Return all columns of users with valid emails.',
      '有效邮箱的前缀必须<b>以字母开头</b>，只能包含字母、数字、下划线 <code>_</code>、点 <code>.</code> 和横杠 <code>-</code>，域名为 <code>@example.com</code>。返回拥有有效邮箱的用户的所有列。'),
    tables: [tbl('Users', 'user_id INT, name TEXT, mail TEXT',
      [[1, 'Winston', 'winston@example.com'], [2, 'Jonathan', 'jonathanisgreat'], [3, 'Annabelle', 'bella-@example.com'], [4, 'Sally', 'sally.come@example.com'],
        [5, 'Marwan', 'quarz#2020@example.com'], [6, 'David', 'david69@gmail.com'], [7, 'Shapiro', '.shapo@example.com'], [8, 'Mei', 'mei_2024@example.comx']])],
    hints: [T('Use <code>REGEXP</code> with anchors <code>^</code> and <code>$</code>.', '使用 <code>REGEXP</code>，并配合锚点 <code>^</code> 和 <code>$</code>。'), T('Escape the dot in the domain: <code>[.]</code> or <code>\\\\.</code>.', '域名中的点要转义：<code>[.]</code> 或 <code>\\\\.</code>。')],
    solution: "SELECT *\nFROM Users\nWHERE mail REGEXP '^[A-Za-z][A-Za-z0-9_.-]*@example[.]com$';",
    explain: T('^ and $ anchor the pattern to the start and end of the string; without them a partial match counts.', '^ 和 $ 把模式锚定在字符串开头和结尾；没有它们的话部分匹配也算。')
  });

  root.SQL_SECTIONS = SECTIONS;
  root.SQL_PROBLEMS = P;
})(typeof window !== 'undefined' ? window : globalThis);
