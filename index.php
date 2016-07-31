<?php

require __DIR__ . '/_assets/inc.php';

$boards = [];
foreach (new DirectoryIterator(__DIR__) as $entry) {
    if ($entry->isDot()) {
        // No '.' or '..' entries
        continue;
    }

    if (!$entry->isDir()) {
        // Only directories wanted, please
        continue;
    }

    if (!is_link("./{$entry->getFilename()}/index.php") || count(glob("./{$entry->getFilename()}/*.svg")) === 0) {
        // Require existence of index.php symlink, plus at least one svg file in each directory to view
        continue;
    }

    $boards[$entry->getFilename()] = $entry->getFileInfo();
}

ksort($boards, SORT_NATURAL);

?><!DOCTYPE html>
<html>
<head>
    <title>My PCB Designs</title>
    <link rel="stylesheet" type="text/css" href="/_assets/style.css">
</head>
<body class="page-index">
    <h1>My PCB Designs</h1>

    <p>Click a link to board design to see full, zoomable SVG renders of both layers of the board.</p>

    <article>
        <ul>
            <?php foreach ($boards as /** @var SplFileInfo */ $board): ?>
                <li>
                    <a href="./<?= html($board->getFilename()) ?>/">
                        <?= html($board->getFilename()) ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </article>

    <?php require __DIR__ . '/_assets/footer.php'; ?>

    <script src="/_assets/script-index.js"></script>
</body>
</html>
