<?php
define('PCB_DIR', getcwd());
define('PCB_DIR_NAME', basename(PCB_DIR));

require __DIR__ . '/_assets/inc.php';

$layers = [];
if (file_exists(PCB_DIR . '/top.svg')) {
    $layers[] = [
        'layer' => 'top',
        'file' => 'top.svg',
        'name' => 'Top Layer',
        'id' => 'pcb-top',
    ];
}
if (file_exists(PCB_DIR . '/bottom.svg')) {
    $layers[] = [
        'layer' => 'bottom',
        'file' => 'bottom.svg',
        'name' => 'Bottom Layer',
        'id' => 'pcb-bottom',
    ];
}

$boardData = null;
if (file_exists(PCB_DIR . '/data.json')) {
    $boardData = json_decode(file_get_contents(PCB_DIR . '/data.json'), true);
}

?><!DOCTYPE html>
<html>
<head>
    <title><?= html(PCB_DIR_NAME) ?></title>
    <script src="/bower_components/svg-pan-zoom/dist/svg-pan-zoom.min.js"></script>
    <script src="/_assets/jquery-3.1.0.slim.min.js"></script>
    <!--<script src="/_assets/hammer.min.js"></script>-->
    <link rel="stylesheet" type="text/css" href="/_assets/style-view.css">
</head>
<body>
<h1>
    <a href="/" class="go-back" title="Return to list of PCBs...">« Back</a>
    <?= html(PCB_DIR_NAME) ?>
</h1>
<br class="clear">

<?php foreach ($layers as $layer): ?>
    <section class="pcb-layer-container">
        <h2>
            <?= html($layer['name']) ?>
            <?php if ($boardData && isset($boardData[$layer['layer']])): ?>
                <span class="layer-size">
                    <?= $boardData[$layer['layer']]['width'] ?> ×
                    <?= $boardData[$layer['layer']]['height']?>
                    <?= $boardData[$layer['layer']]['units'] ?>
                </span>
            <?php endif; ?>
        </h2>
        <object id="<?= html($layer['id']) ?>"
                class="pcb-layer"
                type="image/svg+xml"
                data="./<?= html($layer['file']) ?>">
            Your browser does not support SVG
        </object>
    </section>
<?php endforeach; ?>

<footer>
    <p>
        ©2016<?= (date('Y') !== '2016' ? '—' . date('Y') : '') ?>
        <a href="http://www.andrewgillard.com/">Andrew Gillard</a>
    </p>
    <p>
        Built using
        <a href="https://github.com/tracespace/pcb-stackup">pcb-stackup</a>,
        <a href="https://github.com/mcous/gerber-to-svg">gerber-to-svg</a>,
        <a href="https://github.com/ariutta/svg-pan-zoom">svg-pan-zoom</a><!--,
        <a href="https://github.com/hammerjs/hammer.js">Hammer.js</a>-->
        and inspired by <a href="http://viewer.tracespace.io/">tracespace</a>
    </p>
    <p>
        PCBs designed with <a href="http://kicad-pcb.org/">KiCad</a>,
        to be fabricated by <a href="https://oshpark.com/">OSH Park</a>,
        with optional solder paste stencils from <a href="https://www.oshstencils.com/">OSH Stencils</a>
    </p>
</footer>

<script src="/_assets/script-view.js"></script>
</body>
</html>

