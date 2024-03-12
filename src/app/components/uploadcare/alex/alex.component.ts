import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import * as LR from '@uploadcare/blocks';
import { OutputFileEntry } from '@uploadcare/blocks';
// import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';

// import cssOverrides from './file-uploader.overrides.css?raw';

LR.registerBlocks(LR);

@Component({
    selector: 'app-alex',
    standalone: true,
    imports: [],
    templateUrl: './alex.component.html',
    styleUrl: './alex.component.scss'
})
export class AlexComponent {
    @Input({ required: true }) theme!: 'light' | 'dark';
    @Input() uploaderClassName: string | undefined;
    @Input() files: OutputFileEntry<'success'>[] = [];
    @Output() filesChange = new EventEmitter<OutputFileEntry<'success'>[]>();

    uploadedFiles: OutputFileEntry<'success'>[] = [];
    @ViewChild('ctxProvider', { static: true }) ctxProviderRef!: ElementRef<
        InstanceType<LR.UploadCtxProvider>
    >;

    // blocksStyles = blocksStyles;

    ngOnInit() {
        /*
        Note: File Uploader styles are scoped due to ShadowDOM usage.
        There are two ways to override them. One way is used on the line below,
        another one is to set a custom class to File Uploader,
        and use CSS variables to update styles.

        See more: https://uploadcare.com/docs/file-uploader/styling/
       */
        // LR.FileUploaderRegular.shadowStyles = cssOverrides;

        /*
          Note: Event binding is the main way to get data and other info from File Uploader.
          There plenty of events you may use.

          See more: https://uploadcare.com/docs/file-uploader/events/
         */
        this.ctxProviderRef.nativeElement.addEventListener(
            'change',
            this.handleChangeEvent
        );
        this.ctxProviderRef.nativeElement.addEventListener(
            'modal-close',
            this.handleModalCloseEvent
        );
    }

    ngOnDestroy() {
        /*
          Note: We're resetting styles here just to be sure they do not affect other examples.
          You probably do not need to do it in your app.
         */
        LR.FileUploaderRegular.shadowStyles = '';

        this.ctxProviderRef.nativeElement.removeEventListener('change', this.handleChangeEvent);
        this.ctxProviderRef.nativeElement.removeEventListener('modal-close', this.handleModalCloseEvent);
    }

    /*
      Note: Here we use provider's API to reset File Uploader state.
      It's not necessary though. We use it here to show users
      a fresh version of File Uploader every time they open it.

      Another way is to sync File Uploader state with an external store.
      You can manipulate File Uploader using API calls like `addFileFromObject`, etc.

      See more: https://uploadcare.com/docs/file-uploader/api/
     */
    resetUploaderState() {
        this.ctxProviderRef.nativeElement.uploadCollection.clearAll();
    }

    handleRemoveClick(uuid: OutputFileEntry['uuid']) {
        this.filesChange.emit(this.files.filter((f) => f.uuid !== uuid));
    }

    handleChangeEvent = (e: LR.EventMap['change']) => {
        this.uploadedFiles = e.detail.allEntries.filter(f => f.status === 'success') as OutputFileEntry<'success'>[];
    };

    handleModalCloseEvent = () => {
        this.resetUploaderState();

        this.filesChange.emit([...this.files, ...this.uploadedFiles]);
        this.uploadedFiles = [];
    };
}
